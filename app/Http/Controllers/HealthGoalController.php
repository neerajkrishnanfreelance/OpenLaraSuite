<?php

namespace App\Http\Controllers;

use App\Models\HealthGoal;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HealthGoalController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $healthGoal = HealthGoal::where('user_id', $user->id)->first();

        return Inertia::render('Health/Goals/Index', [
            'healthGoal' => $healthGoal,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'daily_calorie_target' => 'nullable|numeric|min:0',
            'daily_protein_target' => 'nullable|numeric|min:0',
            'daily_carbs_target' => 'nullable|numeric|min:0',
            'daily_fats_target' => 'nullable|numeric|min:0',
            'weekly_workout_target' => 'nullable|integer|min:0',
            'weekly_workout_minutes_target' => 'nullable|integer|min:0',
            'current_weight' => 'nullable|numeric|min:0',
            'target_weight' => 'nullable|numeric|min:0',
            'weight_unit' => 'nullable|string|in:kg,lbs',
            'daily_water_target' => 'nullable|numeric|min:0',
            'start_date' => 'nullable|date',
            'target_date' => 'nullable|date|after:start_date',
        ]);

        $validated['user_id'] = $request->user()->id;

        HealthGoal::updateOrCreate(
            ['user_id' => $request->user()->id],
            $validated
        );

        return redirect()->back()->with('success', 'Health goals updated successfully.');
    }

    public function progress(Request $request)
    {
        $user = $request->user();
        $healthGoal = HealthGoal::where('user_id', $user->id)->first();

        if (!$healthGoal) {
            return response()->json(['message' => 'No goals set'], 404);
        }

        return response()->json([
            'weight_progress' => $healthGoal->weight_progress,
            'days_remaining' => $healthGoal->days_remaining,
        ]);
    }
}
