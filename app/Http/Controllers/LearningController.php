<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class LearningController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        $subjects = Project::learning()
            ->with(['tasks' => function ($query) {
                $query->latest()->limit(5); // Recent topics
            }])
            ->get();

        $timetable = \App\Models\TimetableEntry::where('user_id', $user->id)
            ->with('project')
            ->orderBy('day_of_week')
            ->orderBy('start_time')
            ->get();
            
        // Recent learning logs (Timesheets for learning projects)
        $recentLogs = \App\Models\Timesheet::where('user_id', $user->id)
            ->whereHas('project', function($q) {
                $q->learning();
            })
            ->with(['project', 'task'])
            ->latest()
            ->limit(10)
            ->get();
            
        // KPIs
        $startOfWeek = now()->startOfWeek();
        $endOfWeek = now()->endOfWeek();
        
        $hoursThisWeek = \App\Models\Timesheet::where('user_id', $user->id)
            ->whereHas('project', function($q) { $q->learning(); })
            ->whereBetween('date', [$startOfWeek, $endOfWeek])
            ->sum('hours');
            
        $completedTasks = \App\Models\Task::whereHas('project', function($q) { $q->learning(); })
            ->whereIn('status', ['completed', 'done']) // Assuming 'completed' or 'done' status
            ->count();
            
        // Next Class Logic (Simple: First one found today after now, or first one tomorrow)
        // For simplicity, let's just find the next occurrence in the $timetable array relative to now.
        // Transforming to Carbon for comparison is tricky with just day/time.
        // We'll pass the whole timetable and let Frontend highlight "Next".
        // Or we can do a quick check here.
        $nextClass = null;
        $today = now()->dayOfWeek; // 0 (Sunday) - 6 (Saturday). Laravel Carbon follows ISO-8601 (Mon=1, Sun=7) usually?
        // PHP Carbon: dayOfWeek is 0 (Sunday) to 6 (Saturday).
        
        // Let's filter next class
        $nowTime = now()->format('H:i:s');
        
        // 1. Check today after now
        $nextClass = $timetable->filter(function($t) use ($today, $nowTime) {
            return $t->day_of_week == $today && $t->start_time > $nowTime;
        })->first();
        
        // 2. If null, check future days
        if (!$nextClass) {
             $nextClass = $timetable->filter(function($t) use ($today) {
                return $t->day_of_week > $today;
            })->first();
        }
        
        // 3. If null, check start of week (loop around)
        if (!$nextClass) {
             $nextClass = $timetable->first();
        }

        return Inertia::render('Learning/Index', [
            'subjects' => $subjects,
            'timetable' => $timetable,
            'recentLogs' => $recentLogs,
            'kpis' => [
                'hoursThisWeek' => round($hoursThisWeek, 1),
                'completedTasks' => $completedTasks,
                'nextClass' => $nextClass,
            ]
        ]);
    }

    public function storeSubject(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        Project::create([
            'name' => $request->name,
            'description' => $request->description,
            'status' => 'active',
            'is_learning' => true,
        ]);

        return redirect()->back()->with('message', 'Subject created successfully.');
    }

    public function storeTimetable(Request $request)
    {
        $request->validate([
            'project_id' => 'required|exists:projects,id',
            'day_of_week' => 'required|integer|min:0|max:6',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'location' => 'nullable|string',
        ]);

        \App\Models\TimetableEntry::create([
            'user_id' => Auth::id(),
            'project_id' => $request->project_id,
            'day_of_week' => $request->day_of_week,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'location' => $request->location,
            'color' => $request->color ?? 'bg-blue-100 text-blue-800',
        ]);

        return redirect()->back()->with('message', 'Class scheduled.');
    }
    
    public function destroyTimetable(\App\Models\TimetableEntry $entry)
    {
        if ($entry->user_id !== Auth::id()) abort(403);
        $entry->delete();
        return redirect()->back();
    }
}
