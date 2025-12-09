<?php

namespace App\Http\Controllers;

use App\Models\DailyFoodLog;
use App\Models\FoodItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DailyFoodLogController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $date = $request->input('date', now()->format('Y-m-d'));
        $currentDate = Carbon::parse($date);

        // Get logs for the selected date
        $foodLogs = DailyFoodLog::forUser($user->id)
            ->forDate($currentDate)
            ->with('foodItem')
            ->orderBy('consumed_at')
            ->get()
            ->groupBy('meal_type');

        // Calculate daily totals
        $allLogs = $foodLogs->flatten();
        $dailyTotals = [
            'calories' => $allLogs->sum('total_calories'),
            'protein' => $allLogs->sum('total_protein'),
            'carbs' => $allLogs->sum('total_carbs'),
            'fats' => $allLogs->sum('total_fats'),
            'fiber' => $allLogs->sum('total_fiber'),
        ];

        return Inertia::render('Health/FoodLogs/Index', [
            'foodLogs' => $foodLogs,
            'dailyTotals' => $dailyTotals,
            'currentDate' => $currentDate->format('Y-m-d'),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'food_item_id' => 'required|exists:food_items,id',
            'meal_type' => 'required|in:breakfast,lunch,dinner,snack',
            'servings' => 'required|numeric|min:0.1',
            'consumed_at' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        $foodItem = FoodItem::findOrFail($validated['food_item_id']);
        
        // Calculate nutrition values
        $nutrition = DailyFoodLog::calculateNutrition($foodItem, $validated['servings']);

        $validated['user_id'] = $request->user()->id;
        $validated = array_merge($validated, $nutrition);

        DailyFoodLog::create($validated);

        return redirect()->back()->with('success', 'Food logged successfully.');
    }

    public function update(Request $request, DailyFoodLog $dailyFoodLog)
    {
        $validated = $request->validate([
            'servings' => 'required|numeric|min:0.1',
            'meal_type' => 'required|in:breakfast,lunch,dinner,snack',
            'consumed_at' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        // Recalculate nutrition values
        $nutrition = DailyFoodLog::calculateNutrition(
            $dailyFoodLog->foodItem, 
            $validated['servings']
        );

        $validated = array_merge($validated, $nutrition);
        $dailyFoodLog->update($validated);

        return redirect()->back()->with('success', 'Food log updated successfully.');
    }

    public function destroy(DailyFoodLog $dailyFoodLog)
    {
        $dailyFoodLog->delete();

        return redirect()->back()->with('success', 'Food log deleted successfully.');
    }

    public function dailySummary(Request $request)
    {
        $user = $request->user();
        $date = $request->input('date', now()->format('Y-m-d'));

        $logs = DailyFoodLog::forUser($user->id)
            ->forDate($date)
            ->get();

        $summary = [
            'calories' => $logs->sum('total_calories'),
            'protein' => $logs->sum('total_protein'),
            'carbs' => $logs->sum('total_carbs'),
            'fats' => $logs->sum('total_fats'),
            'fiber' => $logs->sum('total_fiber'),
        ];

        return response()->json($summary);
    }
}
