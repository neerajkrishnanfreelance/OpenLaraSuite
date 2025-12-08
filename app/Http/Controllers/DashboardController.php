<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use App\Models\Timesheet;
use App\Models\OvertimeRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $today = now()->startOfDay();
        $endOfDay = now()->endOfDay();

        // 1. User Profile & Daily Progress Stats
        $todaysTasksTotal = Task::where('assigned_to', $user->id)
            ->whereDate('due_date', $today)
            ->count();

        $todaysTasksCompleted = Task::where('assigned_to', $user->id)
            ->whereDate('due_date', $today)
            ->where('status', 'done')
            ->count();

        $pendingOverall = Task::where('assigned_to', $user->id)
            ->where('status', '!=', 'done')
            ->count();
            
        // 2. On-Time Delivery Calculation (Last 30 Days)
        $completedTasksLast30Days = Task::where('assigned_to', $user->id)
            ->where('status', 'done')
            ->whereDate('updated_at', '>=', now()->subDays(30))
            ->get();
            
        $onTimeCount = $completedTasksLast30Days->filter(function ($task) {
            return $task->due_date >= $task->updated_at; // Assuming updated_at is completion time for 'done' tasks
        })->count();

        $totalCompleted30Days = $completedTasksLast30Days->count();
        $onTimePercentage = $totalCompleted30Days > 0 
            ? round(($onTimeCount / $totalCompleted30Days) * 100) 
            : 100; // Default to 100 if no tasks

        // 3. Follow-up Calls (Meetings Today)
        $todaysMeetingsQuery = \App\Models\Meeting::query()
             ->where(function($query) use ($today, $endOfDay) {
                 $query->whereBetween('start_time', [$today, $endOfDay]);
             });

        if (!$user->hasRole('admin')) {
             $todaysMeetingsQuery->where(function($q) use ($user) {
                 $q->whereHas('participants', function($subQ) use ($user) {
                     $subQ->where('users.id', $user->id);
                 })->orWhere('organizer_id', $user->id);
             });
        }
        
        $todaysMeetings = $todaysMeetingsQuery->with('organizer:id,name,email')->get()->map(function($meeting) {
            return [
                'id' => $meeting->id,
                'title' => $meeting->title,
                'description' => $meeting->description,
                'start' => $meeting->start_time, // Keep as string for JS parsing or format here
                'start_formatted' => $meeting->start_time instanceof \DateTime ? $meeting->start_time->format('h:i A') : \Carbon\Carbon::parse($meeting->start_time)->format('h:i A'),
                'organizer' => $meeting->organizer,
            ];
        });

        // 4. Data for Calendar Widget (All events/meetings)
        // Reusing previous logic or fetching distinct set
         $calendarEventsQuery = \App\Models\Meeting::query();
        if (!$user->hasRole('admin')) {
             $calendarEventsQuery->whereHas('participants', function($q) use ($user) {
                 $q->where('users.id', $user->id);
             })->orWhere('organizer_id', $user->id);
        }
        $calendarEvents = $calendarEventsQuery->with('organizer:id,name')->get()->map(function($meeting) {
            return [
                'id' => $meeting->id,
                'title' => $meeting->title,
                'start' => $meeting->start_time,
                'end' => $meeting->end_time,
                'organizer' => $meeting->organizer->name,
            ];
        });


        // 5. Today's Tasks List
        $todaysTasksList = Task::where('assigned_to', $user->id)
            ->whereDate('due_date', $today)
             ->where('status', '!=', 'done') // Only pending? Or all? Image shows checkbox, implying ability to complete. showing all is safer.
            ->with(['project:id,name', 'assignedUser:id,name,email']) // email for avatar?
            ->get();


        return Inertia::render('Dashboard', [
            'user_stats' => [
                'todays_completed' => $todaysTasksCompleted,
                'todays_total' => $todaysTasksTotal,
                'pending_overall' => $pendingOverall,
                'on_time_percentage' => $onTimePercentage,
                'daily_progress' => $todaysTasksTotal > 0 ? round(($todaysTasksCompleted / $todaysTasksTotal) * 100) : 0,
            ],
            'todays_calls' => $todaysMeetings,
            'todays_tasks' => $todaysTasksList,
            'calendar_events' => $calendarEvents,
             // Keeping old props just in case, but can clean up later if unused
            'tasks' => Task::with('project:id,name')->where('status', '!=', 'done')->get(),
            'users' => \App\Models\User::select('id', 'name')->get(),
            'projects' => \App\Models\Project::select('id', 'name')->where('status', 'active')->get(),
        ]);
    }
}
