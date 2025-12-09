<?php

namespace App\Http\Controllers;

use App\Models\Meeting;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MeetingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        // Get meetings where user is organizer OR participant
        $meetings = Meeting::where('organizer_id', $user->id)
            ->orWhereHas('participants', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->with(['organizer', 'participants'])
            ->latest('start_time')
            ->paginate(10);

        return Inertia::render('Meetings/Index', [
            'meetings' => $meetings,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $meetingableTitle = null;
        if ($request->meetingable_id && $request->meetingable_type) {
            $modelClass = $request->meetingable_type;
            if (class_exists($modelClass)) {
                $model = $modelClass::find($request->meetingable_id);
                // Try to get a title or name 
                $meetingableTitle = $model->title ?? $model->name ?? "Item #{$model->id}";
            }
        }

        return Inertia::render('Meetings/Create', [
            'users' => User::select('id', 'name', 'email')->get(),
            'meetingable_id' => $request->meetingable_id,
            'meetingable_type' => $request->meetingable_type,
            'meetingable_title' => $meetingableTitle,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'location_link' => 'nullable|string|max:255',
            'participant_ids' => 'nullable|array',
            'participant_ids.*' => 'exists:users,id',
            'meetingable_id' => 'nullable|integer',
            'meetingable_type' => 'nullable|string',
        ]);

        $validated['organizer_id'] = Auth::id();

        $meeting = Meeting::create($validated);

        if (isset($validated['participant_ids'])) {
            $meeting->participants()->sync($validated['participant_ids']);
        }

        // Redirect back to the meetingable object if it exists?
        // Or just index. Standard resource redirects to index usually.
        // But if I clicked "Schedule Meeting" from a Task, I might want to go back to the Task.
        // Implementing redirect back logic might be nice but let's stick to Index for now or check if we can redirect back.
        
        return redirect()->route('meetings.index')->with('message', 'Meeting scheduled successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Meeting $meeting)
    {
        if (Auth::id() !== $meeting->organizer_id) {
            abort(403);
        }

        $meeting->load('participants');

        return Inertia::render('Meetings/Edit', [
            'meeting' => $meeting,
            'users' => User::select('id', 'name', 'email')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Meeting $meeting)
    {
        if (Auth::id() !== $meeting->organizer_id) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'location_link' => 'nullable|string|max:255',
            'participant_ids' => 'nullable|array',
            'participant_ids.*' => 'exists:users,id',
        ]);

        $meeting->update($validated);

        if (isset($validated['participant_ids'])) {
            $meeting->participants()->sync($validated['participant_ids']);
        }

        return redirect()->route('meetings.index')->with('message', 'Meeting updated successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Meeting $meeting)
    {
        $meeting->load(['organizer', 'participants']);
        
        return Inertia::render('Meetings/Show', [
            'meeting' => $meeting,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Meeting $meeting)
    {
        if (Auth::id() !== $meeting->organizer_id) {
            abort(403);
        }

        $meeting->delete();

        return redirect()->route('meetings.index')->with('message', 'Meeting cancelled.');
    }
}
