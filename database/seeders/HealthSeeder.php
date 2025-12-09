<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\WorkoutType;
use App\Models\FoodItem;

class HealthSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Seed Workout Types
        $workoutTypes = [
            // Cardio
            ['name' => 'Running', 'category' => 'cardio', 'calories_per_minute' => 10, 'icon' => '🏃', 'description' => 'Outdoor or treadmill running'],
            ['name' => 'Cycling', 'category' => 'cardio', 'calories_per_minute' => 8, 'icon' => '🚴', 'description' => 'Outdoor or stationary bike'],
            ['name' => 'Swimming', 'category' => 'cardio', 'calories_per_minute' => 11, 'icon' => '🏊', 'description' => 'Lap swimming'],
            ['name' => 'Walking', 'category' => 'cardio', 'calories_per_minute' => 4, 'icon' => '🚶', 'description' => 'Brisk walking'],
            ['name' => 'Jump Rope', 'category' => 'cardio', 'calories_per_minute' => 12, 'icon' => '🪢', 'description' => 'Skipping rope'],
            ['name' => 'Rowing', 'category' => 'cardio', 'calories_per_minute' => 9, 'icon' => '🚣', 'description' => 'Rowing machine or water'],
            
            // Strength
            ['name' => 'Weight Lifting', 'category' => 'strength', 'calories_per_minute' => 6, 'icon' => '🏋️', 'description' => 'Free weights or machines'],
            ['name' => 'Bodyweight Training', 'category' => 'strength', 'calories_per_minute' => 5, 'icon' => '💪', 'description' => 'Push-ups, pull-ups, squats'],
            ['name' => 'CrossFit', 'category' => 'strength', 'calories_per_minute' => 10, 'icon' => '⚡', 'description' => 'High-intensity functional training'],
            ['name' => 'Resistance Bands', 'category' => 'strength', 'calories_per_minute' => 4, 'icon' => '🎯', 'description' => 'Band resistance exercises'],
            
            // Flexibility
            ['name' => 'Yoga', 'category' => 'flexibility', 'calories_per_minute' => 3, 'icon' => '🧘', 'description' => 'Various yoga styles'],
            ['name' => 'Pilates', 'category' => 'flexibility', 'calories_per_minute' => 4, 'icon' => '🤸', 'description' => 'Core and flexibility training'],
            ['name' => 'Stretching', 'category' => 'flexibility', 'calories_per_minute' => 2, 'icon' => '🤲', 'description' => 'Static and dynamic stretching'],
            
            // Sports
            ['name' => 'Basketball', 'category' => 'sports', 'calories_per_minute' => 8, 'icon' => '🏀', 'description' => 'Full court or half court'],
            ['name' => 'Soccer', 'category' => 'sports', 'calories_per_minute' => 9, 'icon' => '⚽', 'description' => 'Football/soccer match'],
            ['name' => 'Tennis', 'category' => 'sports', 'calories_per_minute' => 7, 'icon' => '🎾', 'description' => 'Singles or doubles'],
            ['name' => 'Badminton', 'category' => 'sports', 'calories_per_minute' => 6, 'icon' => '🏸', 'description' => 'Badminton match'],
        ];

        foreach ($workoutTypes as $type) {
            WorkoutType::create($type);
        }

        // Seed Common Food Items
        $foodItems = [
            // Fruits
            ['name' => 'Apple', 'category' => 'fruits', 'serving_size' => 182, 'serving_unit' => 'g', 'calories' => 95, 'protein' => 0.5, 'carbs' => 25, 'fats' => 0.3, 'fiber' => 4.4, 'sugar' => 19],
            ['name' => 'Banana', 'category' => 'fruits', 'serving_size' => 118, 'serving_unit' => 'g', 'calories' => 105, 'protein' => 1.3, 'carbs' => 27, 'fats' => 0.4, 'fiber' => 3.1, 'sugar' => 14],
            ['name' => 'Orange', 'category' => 'fruits', 'serving_size' => 131, 'serving_unit' => 'g', 'calories' => 62, 'protein' => 1.2, 'carbs' => 15, 'fats' => 0.2, 'fiber' => 3.1, 'sugar' => 12],
            
            // Vegetables
            ['name' => 'Broccoli', 'category' => 'vegetables', 'serving_size' => 91, 'serving_unit' => 'g', 'calories' => 31, 'protein' => 2.6, 'carbs' => 6, 'fats' => 0.3, 'fiber' => 2.4, 'sugar' => 1.5],
            ['name' => 'Spinach', 'category' => 'vegetables', 'serving_size' => 30, 'serving_unit' => 'g', 'calories' => 7, 'protein' => 0.9, 'carbs' => 1.1, 'fats' => 0.1, 'fiber' => 0.7, 'sugar' => 0.1],
            ['name' => 'Carrot', 'category' => 'vegetables', 'serving_size' => 61, 'serving_unit' => 'g', 'calories' => 25, 'protein' => 0.6, 'carbs' => 6, 'fats' => 0.1, 'fiber' => 1.7, 'sugar' => 2.9],
            
            // Protein
            ['name' => 'Chicken Breast', 'category' => 'protein', 'serving_size' => 100, 'serving_unit' => 'g', 'calories' => 165, 'protein' => 31, 'carbs' => 0, 'fats' => 3.6, 'fiber' => 0, 'sugar' => 0],
            ['name' => 'Salmon', 'category' => 'protein', 'serving_size' => 100, 'serving_unit' => 'g', 'calories' => 208, 'protein' => 20, 'carbs' => 0, 'fats' => 13, 'fiber' => 0, 'sugar' => 0],
            ['name' => 'Eggs', 'category' => 'protein', 'serving_size' => 50, 'serving_unit' => 'g', 'calories' => 72, 'protein' => 6.3, 'carbs' => 0.4, 'fats' => 4.8, 'fiber' => 0, 'sugar' => 0.2],
            ['name' => 'Greek Yogurt', 'category' => 'dairy', 'serving_size' => 170, 'serving_unit' => 'g', 'calories' => 100, 'protein' => 17, 'carbs' => 6, 'fats' => 0.7, 'fiber' => 0, 'sugar' => 4],
            
            // Grains
            ['name' => 'Brown Rice', 'category' => 'grains', 'serving_size' => 195, 'serving_unit' => 'g', 'calories' => 216, 'protein' => 5, 'carbs' => 45, 'fats' => 1.8, 'fiber' => 3.5, 'sugar' => 0.7],
            ['name' => 'Oatmeal', 'category' => 'grains', 'serving_size' => 234, 'serving_unit' => 'g', 'calories' => 166, 'protein' => 5.9, 'carbs' => 28, 'fats' => 3.6, 'fiber' => 4, 'sugar' => 0.6],
            ['name' => 'Whole Wheat Bread', 'category' => 'grains', 'serving_size' => 28, 'serving_unit' => 'g', 'calories' => 69, 'protein' => 3.6, 'carbs' => 12, 'fats' => 0.9, 'fiber' => 1.9, 'sugar' => 1.4],
            
            // Nuts & Seeds
            ['name' => 'Almonds', 'category' => 'snacks', 'serving_size' => 28, 'serving_unit' => 'g', 'calories' => 164, 'protein' => 6, 'carbs' => 6, 'fats' => 14, 'fiber' => 3.5, 'sugar' => 1.2],
            ['name' => 'Peanut Butter', 'category' => 'snacks', 'serving_size' => 32, 'serving_unit' => 'g', 'calories' => 188, 'protein' => 8, 'carbs' => 7, 'fats' => 16, 'fiber' => 2, 'sugar' => 3],
            
            // Beverages
            ['name' => 'Milk', 'category' => 'beverages', 'serving_size' => 244, 'serving_unit' => 'ml', 'calories' => 149, 'protein' => 7.7, 'carbs' => 12, 'fats' => 7.9, 'fiber' => 0, 'sugar' => 12],
            ['name' => 'Protein Shake', 'category' => 'beverages', 'serving_size' => 250, 'serving_unit' => 'ml', 'calories' => 120, 'protein' => 24, 'carbs' => 3, 'fats' => 1.5, 'fiber' => 1, 'sugar' => 1],
        ];

        foreach ($foodItems as $item) {
            $item['is_custom'] = false;
            $item['created_by'] = null;
            FoodItem::create($item);
        }

        $this->command->info('Health module seeded successfully!');
    }
}
