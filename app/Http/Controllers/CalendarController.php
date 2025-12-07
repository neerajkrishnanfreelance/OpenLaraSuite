<?php

namespace App\Http\Controllers;

use App\Models\Meeting;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CalendarController extends Controller
{
    public function index(Request $request)
    {
        $meetings = Meeting::with('organizer')->get()->map(function ($meeting) {
            return [
                'id' => 'm-' . $meeting->id,
                'title' => '📅 ' . $meeting->title,
                'start' => $meeting->start_time,
                'end' => $meeting->end_time,
                'type' => 'meeting',
                'resource' => $meeting,
            ];
        });

        $tasks = Task::whereNotNull('due_date')->get()->map(function ($task) {
            return [
                'id' => 't-' . $task->id,
                'title' => '✅ ' . $task->title,
                'start' => $task->due_date,
                'end' => $task->due_date,
                'allDay' => true,
                'type' => 'task',
                'resource' => $task,
            ];
        });

        $events = $meetings->concat($tasks);

        return Inertia::render('Calendar/Index', [
            'events' => $events,
        ]);
    }
}
