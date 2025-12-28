<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AgricultureController extends Controller
{
    public function index()
    {
        $activeCrops = \App\Models\Crop::where('status', 'active')->count();
        $rndCrops = \App\Models\Crop::where('status', 'active')->where('check_r_n_d', true)->count();
        $recentLogs = \App\Models\CropLog::with('crop')->orderBy('log_date', 'desc')->take(5)->get();

        $notifications = auth()->user()
            ? auth()->user()->notifications()
                ->where('type', 'App\Notifications\UpcomingCropScheduleNotification')
                ->take(10)
                ->get()
            : [];

        $upcomingSchedules = \App\Models\CropSchedule::with('crop')
            ->where('scheduled_date', '>=', now()->toDateString())
            ->where('scheduled_date', '<=', now()->addDays(14)->toDateString()) // Next 2 weeks
            ->whereNull('completed_at')
            ->orderBy('scheduled_date', 'asc')
            ->take(10)
            ->get();

        return \Inertia\Inertia::render('Agriculture/Dashboard', [
            'activeCrops' => $activeCrops,
            'rndCrops' => $rndCrops,
            'recentLogs' => $recentLogs,
            'notifications' => $notifications,
            'upcomingSchedules' => $upcomingSchedules,
        ]);
    }

    public function storeSchedule(Request $request, \App\Models\Crop $crop)
    {
        $validated = $request->validate([
            'activity_type' => 'required|string',
            'scheduled_date' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        $crop->schedules()->create($validated);

        return back()->with('success', 'Schedule added successfully.');
    }
}
