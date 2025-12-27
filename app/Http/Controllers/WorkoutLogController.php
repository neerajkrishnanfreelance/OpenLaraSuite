<?php

namespace App\Http\Controllers;

use App\Models\WorkoutLog;
use App\Models\WorkoutType;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class WorkoutLogController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $date = $request->input('date', now()->format('Y-m-d'));
        $currentDate = Carbon::parse($date);

        // Get workouts for the selected date
        $workouts = WorkoutLog::forUser($user->id)
            ->forDate($currentDate)
            ->with('workoutType')
            ->orderBy('performed_at', 'desc')
            ->get();

        // Get all workout types for the form
        $workoutTypes = WorkoutType::orderBy('category')->orderBy('name')->get();

        // Calculate daily totals
        $dailyTotals = [
            'count' => $workouts->count(),
            'total_minutes' => $workouts->sum('duration_minutes'),
            'total_calories' => $workouts->sum('calories_burned'),
            'total_distance' => $workouts->whereNotNull('distance')->sum('distance'),
        ];

        return Inertia::render('Health/Workouts/Index', [
            'workouts' => $workouts,
            'workoutTypes' => $workoutTypes,
            'dailyTotals' => $dailyTotals,
            'currentDate' => $currentDate->format('Y-m-d'),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'workout_type_id' => 'required|exists:workout_types,id',
            'duration_minutes' => 'required|integer|min:1',
            'distance' => 'nullable|numeric|min:0',
            'distance_unit' => 'nullable|in:km,mi,m',
            'intensity' => 'required|in:low,medium,high',
            'performed_at' => 'required|date',
            'sets' => 'nullable|integer|min:1',
            'reps' => 'nullable|integer|min:1',
            'weight' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string',
        ]);

        $workoutType = WorkoutType::findOrFail($validated['workout_type_id']);
        
        // Calculate calories burned
        $validated['calories_burned'] = WorkoutLog::calculateCalories(
            $workoutType,
            $validated['duration_minutes'],
            $validated['intensity'],
            $validated['distance'] ?? null,
            $validated['distance_unit'] ?? 'km'
        );

        $validated['user_id'] = $request->user()->id;

        WorkoutLog::create($validated);

        return redirect()->back()->with('success', 'Workout logged successfully.');
    }

    public function update(Request $request, WorkoutLog $workoutLog)
    {
        $validated = $request->validate([
            'duration_minutes' => 'required|integer|min:1',
            'distance' => 'nullable|numeric|min:0',
            'distance_unit' => 'nullable|in:km,mi,m',
            'intensity' => 'required|in:low,medium,high',
            'performed_at' => 'required|date',
            'sets' => 'nullable|integer|min:1',
            'reps' => 'nullable|integer|min:1',
            'weight' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string',
        ]);

        // Recalculate calories burned
        $validated['calories_burned'] = WorkoutLog::calculateCalories(
            $workoutLog->workoutType,
            $validated['duration_minutes'],
            $validated['intensity'],
            $validated['distance'] ?? null,
            $validated['distance_unit'] ?? 'km'
        );

        $workoutLog->update($validated);

        return redirect()->back()->with('success', 'Workout updated successfully.');
    }

    public function destroy(WorkoutLog $workoutLog)
    {
        $workoutLog->delete();

        return redirect()->back()->with('success', 'Workout deleted successfully.');
    }

    public function weeklySummary(Request $request)
    {
        $user = $request->user();
        $weekStart = now()->startOfWeek();
        $weekEnd = now()->endOfWeek();

        $workouts = WorkoutLog::forUser($user->id)
            ->dateRange($weekStart, $weekEnd)
            ->get();

        $summary = [
            'count' => $workouts->count(),
            'total_minutes' => $workouts->sum('duration_minutes'),
            'total_calories' => $workouts->sum('calories_burned'),
        ];

        return response()->json($summary);
    }
}
