<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HealthGoal;
use Illuminate\Support\Facades\Auth;

class HealthProfileController extends Controller
{
    /**
     * Calculate health goals based on user profile.
     */
    public function calculateGoals(Request $request)
    {
        $user = $request->user();
        
        // Validate that user has necessary profile data
        if (!$user->height || !$user->weight || !$user->birth_date || !$user->gender || !$user->activity_level) {
            return response()->json([
                'error' => 'Please complete your profile first (Height, Weight, Date of Birth, Gender, Activity Level).'
            ], 422);
        }

        // Calculate Age
        $age = $user->age; // Using the accessor we created

        // Calculate BMR (Mifflin-St Jeor Equation)
        // Men: (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
        // Women: (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161
        
        $bmr = (10 * $user->weight) + (6.25 * $user->height) - (5 * $age);
        
        if ($user->gender === 'male') {
            $bmr += 5;
        } else {
            $bmr -= 161;
        }
        
        // Activity Multipliers
        $multipliers = [
            'sedentary' => 1.2,      // Little or no exercise
            'light' => 1.375,        // Light exercise 1-3 days/week
            'moderate' => 1.55,      // Moderate exercise 3-5 days/week
            'active' => 1.725,       // Hard exercise 6-7 days/week
            'very_active' => 1.9,    // Very hard exercise & physical job
        ];
        
        $activityMultiplier = $multipliers[$user->activity_level] ?? 1.2;
        
        $maintenance = round($bmr * $activityMultiplier);
        
        // Goal Adjustment
        $goalType = $request->input('goal_type', 'maintain');
        $calorieAdjustment = 0;
        
        if ($goalType === 'lose_weight') {
            $calorieAdjustment = -500;
        } elseif ($goalType === 'gain_muscle') {
            $calorieAdjustment = 500; // conservative surplus
        }
        
        $tdee = max(1200, $maintenance + $calorieAdjustment); // Safety floor for women/men mostly
        
        // Macro Split (Standard Balanced: 30% Protein, 35% Carbs, 35% Fat) - This varies but let's start with a standard
        // Protein: 4 calories per gram
        // Carbs: 4 calories per gram
        // Fat: 9 calories per gram
        
        // Adjust macros slightly based on goal?
        // For now keep standard split but valid for the target calories
        $proteinCals = $tdee * 0.25;
        $carbsCals = $tdee * 0.45;
        $fatCals = $tdee * 0.30;
        
        $dailyProtein = round($proteinCals / 4);
        $dailyCarbs = round($carbsCals / 4);
        $dailyFats = round($fatCals / 9);
        
        // Water: Approx 35ml per kg of body weight
        $dailyWater = round(($user->weight * 0.035), 1); // in Liters
        
        return response()->json([
            'maintenance_calories' => $maintenance,
            'daily_calorie_target' => $tdee,
            'daily_protein_target' => $dailyProtein,
            'daily_carbs_target' => $dailyCarbs,
            'daily_fats_target' => $dailyFats,
            'daily_water_target' => $dailyWater,
            'current_weight' => $user->weight,
        ]);
    }
    
    /**
     * Update health profile data (shortcut method if we want to update from the goals modal).
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'birth_date' => ['required', 'date'],
            'gender' => ['required', 'in:male,female,other'],
            'height' => ['required', 'numeric', 'min:0'],
            'weight' => ['required', 'numeric', 'min:0'],
            'activity_level' => ['required', 'string', 'in:sedentary,light,moderate,active,very_active'],
        ]);
        
        $request->user()->update($validated);
        
        return response()->json(['message' => 'Profile updated successfully']);
    }
}
