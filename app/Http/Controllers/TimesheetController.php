<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use App\Models\Timesheet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TimesheetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $query = Timesheet::with(['user', 'project', 'task']);

        if (!$user->hasAnyRole(['admin', 'manager'])) {
            $query->where('user_id', $user->id);
        }

        // Filter by project
        if ($request->filled('project_id')) {
            $query->where('project_id', $request->project_id);
        }

        // Filter by user
        if ($request->filled('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        
        if ($request->has('is_overtime')) {
             if ($request->is_overtime === 'true') {
                 $query->where('is_overtime', true);
             }
        }
        
        // Timer check: is there an active timer?
        $activeTimer = Timesheet::where('user_id', Auth::id())
            ->whereNull('end_time')
            ->whereNotNull('start_time')
            ->first();

        $timesheets = $query->orderBy('date', 'desc')->paginate(10);

        return Inertia::render('Timesheets/Index', [
            'timesheets' => $timesheets,
            'projects' => Auth::user()->projects,
            'filters' => $request->only(['project_id', 'is_overtime']),
            'activeTimer' => $activeTimer,
        ]);
    }

    public function storeTimer(Request $request)
    {
        $request->validate([
            'project_id' => 'required|exists:projects,id',
            'task_id' => 'nullable|exists:tasks,id',
            'description' => 'nullable|string',
            'is_overtime' => 'boolean',
        ]);

        // Check if already running
        $existing = Timesheet::where('user_id', Auth::id())
            ->whereNull('end_time')
            ->whereNotNull('start_time')
            ->first();

        if ($existing) {
            return redirect()->back()->with('error', 'Timer already running.');
        }

        Timesheet::create([
            'user_id' => Auth::id(),
            'project_id' => $request->project_id,
            'task_id' => $request->task_id,
            'date' => now()->toDateString(),
            'start_time' => now(),
            'description' => $request->description,
            'is_overtime' => $request->is_overtime ?? false,
            'status' => 'pending',
            'hours' => 0, // Will update on stop
        ]);
        
        return redirect()->back()->with('message', 'Timer started.');
    }

    public function stopTimer(Request $request)
    {
        $timer = Timesheet::where('user_id', Auth::id())
            ->whereNull('end_time')
            ->whereNotNull('start_time')
            ->firstOrFail();

        $endTime = now();
        $startTime = \Carbon\Carbon::parse($timer->start_time);
        $diffInMinutes = $endTime->diffInMinutes($startTime);
        $hours = round($diffInMinutes / 60, 2);
        
        // Minimum 1 minute logic or just raw
        if ($hours <= 0) $hours = 0.01;

        $timer->update([
            'end_time' => $endTime,
            'hours' => $hours,
        ]);

        return redirect()->back()->with('message', 'Timer stopped. Timesheet captured.');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Timesheets/Create', [
            'projects' => Project::where('status', 'active')->select('id', 'name')->get(),
            // Tasks dependent on project, usually loaded via API or simplified here
            'tasks' => Task::select('id', 'title', 'project_id')->get()->groupBy('project_id'), 
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'task_id' => 'nullable|exists:tasks,id',
            'date' => 'required|date',
            'hours' => 'nullable|numeric|min:0.01|max:24', // Made nullable if auto-calc
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i|after:start_time',
            'description' => 'nullable|string',
        ]);

        // Auto-calculate hours if start/end provided
        if ($request->filled('start_time') && $request->filled('end_time')) {
             $start = \Carbon\Carbon::parse($request->start_time);
             $end = \Carbon\Carbon::parse($request->end_time);
             $validated['hours'] = round($end->diffInMinutes($start) / 60, 2);
        }

        $validated['user_id'] = Auth::id();
        $validated['status'] = 'pending';

        Timesheet::create($validated);

        return redirect()->route('timesheets.index')->with('message', 'Timesheet logged successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Timesheet $timesheet)
    {
        $timesheet->load(['chatterMessages.user', 'chatterMessages.documents', 'relatedMeetings.organizer', 'documents']);

        if (Auth::user()->id !== $timesheet->user_id && !Auth::user()->hasAnyRole(['admin', 'manager'])) {
             abort(403);
        }

        return Inertia::render('Timesheets/Edit', [
            'timesheet' => $timesheet,
            'projects' => Project::where('status', 'active')->select('id', 'name')->get(),
            'tasks' => Task::select('id', 'title', 'project_id')->get()->groupBy('project_id'),
            'chatter_data' => $timesheet->chatterMessages,
            'meetings_data' => $timesheet->relatedMeetings,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Timesheet $timesheet)
    {
        $user = Auth::user();

        // If manager/admin, can approve/reject
        if ($user->hasAnyRole(['admin', 'manager']) && $request->has('status')) {
            $validated = $request->validate([
                'status' => 'required|in:pending,approved,rejected',
            ]);
            $timesheet->update($validated);
            return redirect()->back()->with('message', 'Timesheet status updated.');
        }

        // If updating end_time (from timer)
        if ($request->has('end_time')) {
            $validated = $request->validate([
                'end_time' => 'required|date_format:H:i',
                'hours' => 'required|numeric|min:0.01|max:24',
            ]);
            $timesheet->update($validated);
            return redirect()->back()->with('message', 'Timer stopped and hours calculated.');
        }

        // If owner and pending, can edit details
        if ($timesheet->user_id === $user->id && $timesheet->status === 'pending') {
            $validated = $request->validate([
                'project_id' => 'required|exists:projects,id',
                'task_id' => 'nullable|exists:tasks,id',
                'date' => 'required|date',
                'hours' => 'nullable|numeric|min:0.01|max:24',
                'start_time' => 'nullable|date_format:H:i',
                'end_time' => 'nullable|date_format:H:i|after:start_time',
                'description' => 'nullable|string',
            ]);

            if ($request->filled('start_time') && $request->filled('end_time')) {
                 $start = \Carbon\Carbon::parse($request->start_time);
                 $end = \Carbon\Carbon::parse($request->end_time);
                 $validated['hours'] = round($end->diffInMinutes($start) / 60, 2);
            }

            $timesheet->update($validated);
            return redirect()->route('timesheets.index')->with('message', 'Timesheet updated successfully.');
        }

        return redirect()->back()->with('error', 'Unauthorized action.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Timesheet $timesheet)
    {
        if (Auth::user()->id !== $timesheet->user_id && !Auth::user()->hasAnyRole(['admin', 'manager'])) {
             abort(403);
        }
        
        $timesheet->delete();

        return redirect()->route('timesheets.index')->with('message', 'Timesheet deleted successfully.');
    }
}
