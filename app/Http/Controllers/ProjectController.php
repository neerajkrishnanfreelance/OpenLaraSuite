<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   // app/Http/Controllers/ProjectController.php

public function index(Request $request)
{
    $projects = Project::latest()->paginate(10);

    return Inertia::render('Projects/Index', [
        'projects' => $projects,
    ]);
}

   public function list_view(Request $request)
{
    $projects = Project::latest()->paginate(10);

    return Inertia::render('Projects/Index', [
        'projects' => $projects,
    ]);
}

    /**
     * Show the form for creating a new resource.
     */
   
    public function create()
    {
        return Inertia::render('Projects/Create', [
            'users' => User::role('employee')->get(), // Only list employees for assignment
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'status' => 'required|in:active,archived',
            'user_ids' => 'nullable|array',
            'user_ids.*' => 'exists:users,id',
        ]);

        $project = Project::create($validated);

        if (isset($validated['user_ids'])) {
            $project->users()->sync($validated['user_ids']);
        }

        return redirect()->route('projects.index')->with('message', 'Project created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $project->load(['users', 'tasks.assignedUser', 'tasks.creator']);

        return Inertia::render('Projects/Show', [
            'project' => $project,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        $project->load(['chatterMessages.user', 'chatterMessages.documents', 'relatedMeetings.organizer']);

        return Inertia::render('Projects/Edit', [
            'project' => $project->load('users'),
            'users' => User::all(),
            'chatter_data' => $project->chatterMessages,
            'meetings_data' => $project->relatedMeetings,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'status' => 'required|in:active,archived',
            'user_ids' => 'nullable|array',
            'user_ids.*' => 'exists:users,id',
        ]);

        $project->update($validated);

        if (isset($validated['user_ids'])) {
            $project->users()->sync($validated['user_ids']);
        }

        return redirect()->route('projects.index')->with('message', 'Project updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $project->delete();

        return redirect()->route('projects.index')->with('message', 'Project deleted successfully.');
    }
}
