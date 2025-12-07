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
        
        $stats = [
            'active_projects' => Project::where('status', 'active')->count(),
            'my_pending_tasks' => Task::where('assigned_to', $user->id)
                ->where('status', '!=', 'done')
                ->count(),
            'my_hours_month' => Timesheet::where('user_id', $user->id)
                ->whereMonth('date', now()->month)
                ->sum('hours'),
        ];

        // Manager specific stats
        if ($user->hasAnyRole(['admin', 'manager'])) {
            $stats['pending_approvals'] = Timesheet::where('status', 'pending')->count() 
                + OvertimeRequest::where('status', 'pending')->count();
        }

        // Chart Data 1: Task Status Distribution (Global or User specific? Let's do Global for now or My Tasks)
        // Let's do "My Tasks Status" for standard employee, "All Tasks" for Manager
        $taskQuery = Task::query();
        if (!$user->hasAnyRole(['admin', 'manager'])) {
            $taskQuery->where('assigned_to', $user->id);
        }
        $taskStatusData = $taskQuery->select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->get();

        // Chart Data 2: Hours Logged Last 7 Days
        $hoursQuery = Timesheet::whereDate('date', '>=', now()->subDays(6));
        if (!$user->hasAnyRole(['admin', 'manager'])) {
            $hoursQuery->where('user_id', $user->id);
        }
        $hoursData = $hoursQuery->select('date', DB::raw('sum(hours) as total_hours'))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // New Data: Today's Pending Tasks
        $todaysTasks = Task::where('assigned_to', $user->id)
            ->whereDate('due_date', now()->today())
            ->where('status', '!=', 'done')
            ->with('project:id,name')
            ->get();

        // New Data: Meetings for Calendar
        $meetingsQuery = \App\Models\Meeting::query();
        if (!$user->hasRole('admin')) {
             $meetingsQuery->whereHas('participants', function($q) use ($user) {
                 $q->where('users.id', $user->id);
             })->orWhere('organizer_id', $user->id);
        }
        $meetings = $meetingsQuery->with('organizer:id,name')->get()->map(function($meeting) {
            return [
                'id' => $meeting->id,
                'title' => $meeting->title,
                'start' => $meeting->start_time,
                'end' => $meeting->end_time,
                'organizer' => $meeting->organizer->name,
            ];
        });


        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'charts' => [
                'task_status' => $taskStatusData,
                'hours_trend' => $hoursData,
            ],
            'todays_tasks' => $todaysTasks,
            'calendar_events' => $meetings,
        ]);
    }
}
