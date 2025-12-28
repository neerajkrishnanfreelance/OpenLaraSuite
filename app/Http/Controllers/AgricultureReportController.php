<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AgricultureReportController extends Controller
{
    public function index() {
        $crops = \App\Models\Crop::where('status', 'active')->orderBy('name')->get();
        return \Inertia\Inertia::render('Agriculture/Reports/Index', [
            'crops' => $crops
        ]);
    }

    public function daily(Request $request) {
        $validated = $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'crop_id' => 'nullable|exists:crops,id',
        ]);

        $query = \App\Models\CropLog::with('crop')
            ->whereBetween('log_date', [$validated['start_date'], $validated['end_date']]);

        if ($request->filled('crop_id')) {
            $query->where('crop_id', $validated['crop_id']);
        }

        $logs = $query->orderBy('log_date', 'asc')->orderBy('created_at', 'asc')->get();

        return \Inertia\Inertia::render('Agriculture/Reports/DailyReport', [
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'logs' => $logs,
            'filters' => $request->only(['crop_id']),
        ]);
    }
}
