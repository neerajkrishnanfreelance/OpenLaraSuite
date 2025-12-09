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
        $subjects = Project::learning()
            ->with(['tasks' => function ($query) {
                $query->latest()->limit(5); // Recent topics
            }])
            ->get();

        $timetable = \App\Models\TimetableEntry::where('user_id', Auth::id())
            ->with('project')
            ->orderBy('day_of_week')
            ->orderBy('start_time')
            ->get();
            
        // Recent learning logs (Timesheets for learning projects)
        $recentLogs = \App\Models\Timesheet::where('user_id', Auth::id())
            ->whereHas('project', function($q) {
                $q->learning();
            })
            ->with(['project', 'task'])
            ->latest()
            ->limit(10)
            ->get();

        return Inertia::render('Learning/Index', [
            'subjects' => $subjects,
            'timetable' => $timetable,
            'recentLogs' => $recentLogs,
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
