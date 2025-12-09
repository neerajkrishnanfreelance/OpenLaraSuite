<?php

namespace App\Http\Controllers;

use App\Models\DailyFoodLog;
use App\Models\WorkoutLog;
use App\Models\HealthGoal;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class HealthDashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $date = $request->input('date', now()->format('Y-m-d'));
        $currentDate = Carbon::parse($date);

        // Get user's health goal
        $healthGoal = HealthGoal::where('user_id', $user->id)->first();

        // Today's nutrition summary
        $todayFoodLogs = DailyFoodLog::forUser($user->id)
            ->forDate($currentDate)
            ->with('foodItem')
            ->get();

        $todayNutrition = [
            'calories' => $todayFoodLogs->sum('total_calories'),
            'protein' => $todayFoodLogs->sum('total_protein'),
            'carbs' => $todayFoodLogs->sum('total_carbs'),
            'fats' => $todayFoodLogs->sum('total_fats'),
            'fiber' => $todayFoodLogs->sum('total_fiber'),
        ];

        // Today's workout summary
        $todayWorkouts = WorkoutLog::forUser($user->id)
            ->forDate($currentDate)
            ->with('workoutType')
            ->get();

        $todayWorkoutSummary = [
            'count' => $todayWorkouts->count(),
            'total_minutes' => $todayWorkouts->sum('duration_minutes'),
            'total_calories_burned' => $todayWorkouts->sum('calories_burned'),
        ];

        // Weekly nutrition trend (last 7 days)
        $weekStart = $currentDate->copy()->subDays(6);
        $weeklyFoodLogs = DailyFoodLog::forUser($user->id)
            ->dateRange($weekStart, $currentDate)
            ->get()
            ->groupBy(function ($log) {
                return $log->consumed_at->format('Y-m-d');
            });

        $weeklyNutritionTrend = [];
        for ($i = 6; $i >= 0; $i--) {
            $day = $currentDate->copy()->subDays($i);
            $dayKey = $day->format('Y-m-d');
            $dayLogs = $weeklyFoodLogs->get($dayKey, collect());

            $weeklyNutritionTrend[] = [
                'date' => $dayKey,
                'day' => $day->format('D'),
                'calories' => $dayLogs->sum('total_calories'),
                'protein' => $dayLogs->sum('total_protein'),
                'carbs' => $dayLogs->sum('total_carbs'),
                'fats' => $dayLogs->sum('total_fats'),
            ];
        }

        // Weekly workout trend
        $weeklyWorkouts = WorkoutLog::forUser($user->id)
            ->dateRange($weekStart, $currentDate)
            ->get()
            ->groupBy(function ($log) {
                return $log->performed_at->format('Y-m-d');
            });

        $weeklyWorkoutTrend = [];
        for ($i = 6; $i >= 0; $i--) {
            $day = $currentDate->copy()->subDays($i);
            $dayKey = $day->format('Y-m-d');
            $dayWorkouts = $weeklyWorkouts->get($dayKey, collect());

            $weeklyWorkoutTrend[] = [
                'date' => $dayKey,
                'day' => $day->format('D'),
                'count' => $dayWorkouts->count(),
                'minutes' => $dayWorkouts->sum('duration_minutes'),
                'calories' => $dayWorkouts->sum('calories_burned'),
            ];
        }

        // Recent food logs (last 5)
        $recentFoodLogs = DailyFoodLog::forUser($user->id)
            ->with('foodItem')
            ->orderBy('consumed_at', 'desc')
            ->limit(5)
            ->get();

        // Recent workouts (last 5)
        $recentWorkouts = WorkoutLog::forUser($user->id)
            ->with('workoutType')
            ->orderBy('performed_at', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('Health/Dashboard', [
            'healthGoal' => $healthGoal,
            'todayNutrition' => $todayNutrition,
            'todayWorkoutSummary' => $todayWorkoutSummary,
            'weeklyNutritionTrend' => $weeklyNutritionTrend,
            'weeklyWorkoutTrend' => $weeklyWorkoutTrend,
            'recentFoodLogs' => $recentFoodLogs,
            'recentWorkouts' => $recentWorkouts,
            'currentDate' => $currentDate->format('Y-m-d'),
        ]);
    }
}
