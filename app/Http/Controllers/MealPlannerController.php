<?php

namespace App\Http\Controllers;

use App\Models\MealPlan;
use App\Models\FoodItem;
use App\Models\HealthGoal;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class MealPlannerController extends Controller
{
    public function index(Request $request)
    {
        $date = $request->input('date', now()->format('Y-m-d'));
        // Get plans for the week surrounding the date? Or just the day?
        // Let's do a weekly view eventually, but start with Day View for simplicity or just load the requested date's plans
        
        $mealPlans = MealPlan::with('foodItem')
            ->where('user_id', $request->user()->id)
            ->whereDate('date', $date)
            ->get();

        $dailyTotals = [
            'calories' => $mealPlans->sum('calories'),
            'protein' => $mealPlans->sum('protein'),
            'carbs' => $mealPlans->sum('carbs'),
            'fats' => $mealPlans->sum('fats'),
        ];

        $userGoal = HealthGoal::where('user_id', $request->user()->id)->first();
        $dailyGoal = $userGoal ? [
            'calories' => $userGoal->daily_calorie_target,
            'protein' => $userGoal->daily_protein_target,
            'carbs' => $userGoal->daily_carbs_target,
            'fats' => $userGoal->daily_fats_target,
        ] : null;

        return Inertia::render('Health/MealPlanner/Index', [
            'date' => $date,
            'mealPlans' => $mealPlans->groupBy('meal_type'),
            'dailyTotals' => $dailyTotals,
            'dailyGoal' => $dailyGoal,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'meal_type' => 'required|in:breakfast,lunch,dinner,snack',
            'food_item_id' => 'required|exists:food_items,id',
            'serving_amount' => 'required|numeric|min:0.1',
        ]);

        $foodItem = FoodItem::findOrFail($validated['food_item_id']);

        // Calculate macros
        $multiplier = $validated['serving_amount'];
        
        $mealPlan = MealPlan::create([
            'user_id' => $request->user()->id,
            'date' => $validated['date'],
            'meal_type' => $validated['meal_type'],
            'food_item_id' => $validated['food_item_id'],
            'serving_amount' => $validated['serving_amount'],
            'calories' => $foodItem->calories * $multiplier,
            'protein' => $foodItem->protein * $multiplier,
            'carbs' => $foodItem->carbs * $multiplier,
            'fats' => $foodItem->fats * $multiplier,
        ]);

        return redirect()->back()->with('success', 'Meal added to plan.');
    }

    public function destroy(MealPlan $mealPlan)
    {
        if ($mealPlan->user_id !== request()->user()->id) {
            abort(403);
        }
        
        $mealPlan->delete();
        
        return redirect()->back()->with('success', 'Meal removed from plan.');
    }

    public function suggest(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'meal_type' => 'required|in:breakfast,lunch,dinner,snack',
        ]);

        $user = $request->user();
        $goal = HealthGoal::where('user_id', $user->id)->first();
        
        // Default target if no goal set: 2000 kcal
        $dailyCalories = $goal ? $goal->daily_calorie_target : 2000;
        
        // Distribution
        $distribution = [
            'breakfast' => 0.25,
            'lunch' => 0.35,
            'dinner' => 0.30,
            'snack' => 0.10,
        ];
        
        $targetCalories = $dailyCalories * ($distribution[$request->meal_type] ?? 0.25);
        $minCals = $targetCalories * 0.7; // +/- 30% range
        $maxCals = $targetCalories * 1.3;
        
        // Suggest Food Items
        // 1. Prioritize items in the matching category
        // 2. Filter by calorie range (per serving, assume 1 serving for now)
        
        $query = FoodItem::query();
        
        // Simple heuristic for category matching
        if ($request->meal_type === 'breakfast') {
            $query->whereIn('category', ['breakfast', 'dairy', 'fruits', 'grains']);
        } elseif ($request->meal_type === 'lunch' || $request->meal_type === 'dinner') {
            $query->whereIn('category', ['protein', 'vegetables', 'grains', 'lunch', 'dinner']);
        } elseif ($request->meal_type === 'snack') {
            $query->whereIn('category', ['snacks', 'fruits', 'dairy']);
        }

        // Dietary Preferences
        if ($request->has('preference')) {
            switch ($request->preference) {
                case 'high_protein':
                    $query->orderByDesc('protein');
                    break;
                case 'low_carb':
                    $query->orderBy('carbs');
                    break;
                case 'low_fat':
                    $query->orderBy('fats');
                    break;
                case 'balanced':
                default:
                    $query->inRandomOrder();
                    break;
            }
        } else {
            $query->inRandomOrder();
        }
        
        $suggestions = $query->whereBetween('calories', [$minCals, $maxCals])
            ->limit(5)
            ->get();
            
        // Fallback: if no suggestions found in range, just return random items from category
        if ($suggestions->isEmpty()) {
             $suggestions = FoodItem::query()
                ->whereIn('category', $request->meal_type === 'breakfast' ? ['breakfast', 'dairy', 'fruits', 'grains'] : ['protein', 'vegetables', 'grains'])
                ->inRandomOrder()
                ->limit(5)
                ->get();
        }

        return response()->json([
            'target_calories' => round($targetCalories),
            'suggestions' => $suggestions
        ]);
    }
}
