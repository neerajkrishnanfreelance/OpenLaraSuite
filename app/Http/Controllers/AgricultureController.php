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

        return \Inertia\Inertia::render('Agriculture/Dashboard', [
            'activeCrops' => $activeCrops,
            'rndCrops' => $rndCrops,
            'recentLogs' => $recentLogs,
        ]);
    }
}
