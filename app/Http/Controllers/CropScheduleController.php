<?php

namespace App\Http\Controllers;

use App\Models\Crop;
use App\Models\CropSchedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class CropScheduleController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Crop $crop)
    {
        $validated = $request->validate([
            'activity_type' => 'required|string',
            'scheduled_date' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        $crop->schedules()->create($validated);

        return Redirect::back()->with('success', 'Activity scheduled successfully.');
    }

    public function markAsComplete(CropSchedule $schedule)
    {
        $schedule->update([
            'completed_at' => now(),
        ]);

        return Redirect::back()->with('success', 'Schedule marked as complete.');
    }
}
