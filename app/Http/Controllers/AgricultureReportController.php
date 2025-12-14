<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AgricultureReportController extends Controller
{
    public function index() {
        return \Inertia\Inertia::render('Agriculture/Reports/Index');
    }

    public function daily(Request $request) {
        $validated = $request->validate([
            'date' => 'required|date',
        ]);

        $date = $validated['date'];
        $logs = \App\Models\CropLog::with('crop')
            ->where('log_date', $date)
            ->orderBy('created_at', 'asc')
            ->get();

        return \Inertia\Inertia::render('Agriculture/Reports/DailyReport', [
            'date' => $date,
            'logs' => $logs,
        ]);
    }
}
