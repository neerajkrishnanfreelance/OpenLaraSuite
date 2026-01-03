<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\LeadStage;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Task::with(['project', 'assignedUser', 'creator', 'contact', 'leadStage']);

        if ($request->filled('project_id')) {
            $query->where('project_id', $request->project_id);
        }

        if ($request->filled('assigned_to')) {
            if ($request->assigned_to === 'unassigned') {
                $query->whereNull('assigned_to');
            } else {
                $query->where('assigned_to', $request->assigned_to);
            }
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // For Kanban, we might want all tasks without pagination, but for List view we want pagination.
        // Let's return paginated results by default, and if 'all' is requested (for Kanban), return all.
        $tasks = $request->has('all') 
            ? $query->get() 
            : $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
            'projects' => Project::select('id', 'name')->get(),
            'users' => User::role('employee')->select('id', 'name')->get(),
            'lead_stages' => LeadStage::orderBy('order')->select('id', 'name', 'color')->get(),
            'filters' => $request->only(['project_id', 'assigned_to', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Tasks/Create', [
            'projects' => Project::select('id', 'name')->get(),
            'users' => User::role('employee')->select('id', 'name')->get(),
            'contacts' => Contact::select('id', 'name')->get(),
            'lead_stages' => LeadStage::orderBy('order')->select('id', 'name')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'assigned_to' => 'nullable|exists:users,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:low,medium,high',
            'status' => 'required|in:todo,in_progress,review,done',
            'due_date' => 'nullable|date',
            // Lead fields
            'contact_id' => 'nullable|exists:contacts,id',
            'lead_stage_id' => 'nullable|exists:lead_stages,id',
            'contact_name' => 'nullable|string|max:255',
            'mobile' => 'nullable|string|max:20',
            'expected_revenue' => 'nullable|numeric',
            'stage' => 'nullable|string|max:50',
            'source' => 'nullable|string|max:50',
            // Extras
            'initial_chatter' => 'nullable|string',
            'create_meeting' => 'nullable|boolean',
            'meeting_details' => 'nullable|array',
            'meeting_details.title' => 'required_if:create_meeting,true|nullable|string|max:255',
            'meeting_details.start_time' => 'required_if:create_meeting,true|nullable|date',
            'meeting_details.end_time' => 'required_if:create_meeting,true|nullable|date|after:meeting_details.start_time',
        ]);

        $validated['created_by'] = Auth::id();

        $task = \Illuminate\Support\Facades\DB::transaction(function () use ($validated, $request) {
            $task = Task::create($validated);

            // Handle Initial Chatter
            if (!empty($validated['initial_chatter'])) {
                $task->chatterMessages()->create([
                    'user_id' => Auth::id(),
                    'message' => $validated['initial_chatter'],
                ]);
            }

            // Handle Initial Meeting
            if (!empty($validated['create_meeting']) && $validated['create_meeting']) {
                $meetingData = $validated['meeting_details'];
                $meetingData['organizer_id'] = Auth::id();
                
                $task->relatedMeetings()->create([
                    'title' => $meetingData['title'],
                    'start_time' => $meetingData['start_time'],
                    'end_time' => $meetingData['end_time'],
                    'description' => $meetingData['description'] ?? null,
                    'organizer_id' => Auth::id(),
                ]);
            }

            return $task;
        });

        return redirect()->route('tasks.index')->with('message', 'Task created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        $task->load(['project', 'assignedUser', 'creator', 'timesheets', 'activities' => function ($query) {
            $query->orderBy('due_at', 'asc');
        }, 'chatterMessages.user', 'contact', 'leadStage']);
        
        return Inertia::render('Tasks/Show', [
            'task' => $task,
            'contacts' => Contact::select('id', 'name')->get(),
            'lead_stages' => LeadStage::orderBy('order')->select('id', 'name')->get(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $task->load(['chatterMessages.user', 'chatterMessages.documents', 'relatedMeetings.organizer', 'documents', 'timesheets.user', 'contact', 'leadStage']);

        return Inertia::render('Tasks/Edit', [
            'task' => $task,
            'projects' => Project::all(),
            'users' => User::all(),
            'contacts' => Contact::select('id', 'name')->get(),
            'lead_stages' => LeadStage::orderBy('order')->select('id', 'name')->get(),
            'chatter_data' => $task->chatterMessages,
            'meetings_data' => $task->relatedMeetings,
            'documents' => $task->documents,
            'timesheets_data' => $task->timesheets,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'assigned_to' => 'nullable|exists:users,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:low,medium,high',
            'status' => 'required|in:todo,in_progress,review,done',
            'due_date' => 'nullable|date',
            // Lead fields
            'contact_id' => 'nullable|exists:contacts,id',
            'lead_stage_id' => 'nullable|exists:lead_stages,id',
            'contact_name' => 'nullable|string|max:255',
            'mobile' => 'nullable|string|max:20',
            'expected_revenue' => 'nullable|numeric',
            'stage' => 'nullable|string|max:50',
            'source' => 'nullable|string|max:50',
        ]);

        $task->update($validated);

        return redirect()->back()->with('message', 'Task updated successfully.');
    }

    public function convertToProject(Request $request, Task $task)
    {
        $project = \Illuminate\Support\Facades\DB::transaction(function () use ($task) {
            $project = Project::create([
                'name' => $task->title, // Assuming Lead Title is Project Name
                'description' => $task->description . "\n\nConverted from Lead: " . $task->id,
                'status' => 'planning', // Default status
                'start_date' => now(),
                // 'client_id' => $task->contact_id // If Project had client_id
            ]);

            // Create default stage/task or move this task to the new project?
            // Option: Move the lead task to the new project as a task
            // But usually Lead -> Project entity.
            
            // Mark Lead as Won
            $task->update([
                'stage' => 'Won', 
                'lead_stage_id' => LeadStage::where('name', 'Won')->first()?->id ?? null,
                'status' => 'done'
            ]);

            return $project;
        });

        return redirect()->route('projects.show', $project)
            ->with('success', 'Project created from Lead successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();

        return redirect()->route('tasks.index')->with('message', 'Task deleted successfully.');
    }

    public function storeActivity(Request $request, Task $task)
    {
        $validated = $request->validate([
            'type' => 'required|string|in:call,email,meeting',
            'subject' => 'required|string|max:255',
            'due_at' => 'required|date',
            'description' => 'nullable|string',
        ]);

        $task->activities()->create($validated);

        return redirect()->back()->with('message', 'Activity scheduled.');
    }

    public function updateActivity(Request $request, Task $task, \App\Models\ScheduledActivity $activity)
    {
        $validated = $request->validate([
            'is_completed' => 'required|boolean',
        ]);

        $activity->update($validated);
        
        return redirect()->back()->with('message', 'Activity updated.');
    }

    public function storeMessage(Request $request, Task $task)
    {
        $validated = $request->validate([
            'message' => 'required|string',
        ]);

        $task->chatterMessages()->create([
            'user_id' => Auth::id(),
            'message' => $validated['message'],
        ]);

        return redirect()->back()->with('message', 'Message sent.');
    }

    public function storeTimesheet(Request $request, Task $task)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'date' => 'required|date',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i',
            'hours' => 'required|numeric|min:0.01|max:24',
            'description' => 'nullable|string',
            'is_overtime' => 'nullable|boolean',
        ]);

        $validated['project_id'] = $task->project_id;
        $validated['task_id'] = $task->id;
        $validated['status'] = 'pending';
        $validated['is_overtime'] = $validated['is_overtime'] ?? false;

        \App\Models\Timesheet::create($validated);

        return redirect()->back()->with('message', 'Timesheet entry created successfully.');
    }
}
