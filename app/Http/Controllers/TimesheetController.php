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

        if ($request->filled('project_id')) {
            $query->where('project_id', $request->project_id);
        }

        if ($request->filled('date')) {
            $query->where('date', $request->date);
        }

        $timesheets = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Timesheets/Index', [
            'timesheets' => $timesheets,
            'projects' => Project::select('id', 'name')->get(),
        ]);
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
            'hours' => 'required|numeric|min:0.5|max:24',
            'description' => 'nullable|string',
        ]);

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

        // If owner and pending, can edit details
        if ($timesheet->user_id === $user->id && $timesheet->status === 'pending') {
            $validated = $request->validate([
                'project_id' => 'required|exists:projects,id',
                'task_id' => 'nullable|exists:tasks,id',
                'date' => 'required|date',
                'hours' => 'required|numeric|min:0.5|max:24',
                'description' => 'nullable|string',
            ]);
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
