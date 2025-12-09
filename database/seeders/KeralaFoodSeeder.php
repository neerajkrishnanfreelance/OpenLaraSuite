<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\FoodItem;

class KeralaFoodSeeder extends Seeder
{
    public function run()
    {
        $keralaFoods = [
            // Breakfast Items
            ['name' => 'Puttu with Kadala Curry', 'category' => 'Breakfast', 'serving_size' => 150, 'serving_unit' => 'g', 'calories' => 180, 'protein' => 5.2, 'carbs' => 35.0, 'fats' => 2.5, 'is_custom' => false],
            ['name' => 'Plain Appam', 'category' => 'Breakfast', 'serving_size' => 70, 'serving_unit' => 'g', 'calories' => 120, 'protein' => 2.0, 'carbs' => 25.0, 'fats' => 1.0, 'is_custom' => false],
            ['name' => 'Egg Appam', 'category' => 'Breakfast', 'serving_size' => 100, 'serving_unit' => 'g', 'calories' => 190, 'protein' => 8.0, 'carbs' => 25.0, 'fats' => 6.0, 'is_custom' => false],
            ['name' => 'Idiyappam', 'category' => 'Breakfast', 'serving_size' => 100, 'serving_unit' => 'g', 'calories' => 110, 'protein' => 2.5, 'carbs' => 24.0, 'fats' => 0.5, 'is_custom' => false],
            ['name' => 'Plain Dosa', 'category' => 'Breakfast', 'serving_size' => 80, 'serving_unit' => 'g', 'calories' => 133, 'protein' => 3.9, 'carbs' => 25.0, 'fats' => 2.6, 'is_custom' => false],
            ['name' => 'Masala Dosa', 'category' => 'Breakfast', 'serving_size' => 150, 'serving_unit' => 'g', 'calories' => 220, 'protein' => 5.5, 'carbs' => 38.0, 'fats' => 5.0, 'is_custom' => false],
            ['name' => 'Idli', 'category' => 'Breakfast', 'serving_size' => 40, 'serving_unit' => 'g', 'calories' => 58, 'protein' => 2.0, 'carbs' => 12.0, 'fats' => 0.5, 'is_custom' => false],
            ['name' => 'Medu Vada', 'category' => 'Breakfast', 'serving_size' => 60, 'serving_unit' => 'g', 'calories' => 180, 'protein' => 6.0, 'carbs' => 20.0, 'fats' => 8.0, 'is_custom' => false],
            ['name' => 'Pathiri', 'category' => 'Breakfast', 'serving_size' => 70, 'serving_unit' => 'g', 'calories' => 140, 'protein' => 2.5, 'carbs' => 30.0, 'fats' => 1.5, 'is_custom' => false],
            ['name' => 'Pazham Pori (Banana Fritters)', 'category' => 'Snacks', 'serving_size' => 80, 'serving_unit' => 'g', 'calories' => 150, 'protein' => 2.0, 'carbs' => 28.0, 'fats' => 4.0, 'is_custom' => false],
            ['name' => 'Unniyappam', 'category' => 'Snacks', 'serving_size' => 30, 'serving_unit' => 'g', 'calories' => 95, 'protein' => 1.5, 'carbs' => 18.0, 'fats' => 2.5, 'is_custom' => false],

            // Rice & Main Dishes
            ['name' => 'Matta Rice (Boiled)', 'category' => 'Main Course', 'serving_size' => 150, 'serving_unit' => 'g', 'calories' => 130, 'protein' => 2.7, 'carbs' => 28.0, 'fats' => 0.3, 'is_custom' => false],
            ['name' => 'White Rice (Boiled)', 'category' => 'Main Course', 'serving_size' => 150, 'serving_unit' => 'g', 'calories' => 130, 'protein' => 2.4, 'carbs' => 28.0, 'fats' => 0.3, 'is_custom' => false],
            ['name' => 'Kanji (Rice Porridge)', 'category' => 'Main Course', 'serving_size' => 200, 'serving_unit' => 'ml', 'calories' => 70, 'protein' => 1.5, 'carbs' => 15.0, 'fats' => 0.2, 'is_custom' => false],
            ['name' => 'Ghee Rice', 'category' => 'Main Course', 'serving_size' => 180, 'serving_unit' => 'g', 'calories' => 210, 'protein' => 3.5, 'carbs' => 35.0, 'fats' => 6.0, 'is_custom' => false],
            ['name' => 'Malabar Biriyani', 'category' => 'Main Course', 'serving_size' => 300, 'serving_unit' => 'g', 'calories' => 320, 'protein' => 18.0, 'carbs' => 42.0, 'fats' => 10.0, 'is_custom' => false],
            ['name' => 'Thalassery Biriyani', 'category' => 'Main Course', 'serving_size' => 300, 'serving_unit' => 'g', 'calories' => 340, 'protein' => 20.0, 'carbs' => 45.0, 'fats' => 11.0, 'is_custom' => false],

            // Curries & Gravies
            ['name' => 'Fish Curry (Meen Curry)', 'category' => 'Main Course', 'serving_size' => 200, 'serving_unit' => 'g', 'calories' => 180, 'protein' => 22.0, 'carbs' => 5.0, 'fats' => 8.0, 'is_custom' => false],
            ['name' => 'Chicken Curry', 'category' => 'Main Course', 'serving_size' => 200, 'serving_unit' => 'g', 'calories' => 220, 'protein' => 25.0, 'carbs' => 6.0, 'fats' => 11.0, 'is_custom' => false],
            ['name' => 'Beef Fry', 'category' => 'Main Course', 'serving_size' => 150, 'serving_unit' => 'g', 'calories' => 280, 'protein' => 26.0, 'carbs' => 4.0, 'fats' => 18.0, 'is_custom' => false],
            ['name' => 'Egg Roast', 'category' => 'Main Course', 'serving_size' => 120, 'serving_unit' => 'g', 'calories' => 180, 'protein' => 12.0, 'carbs' => 6.0, 'fats' => 12.0, 'is_custom' => false],
            ['name' => 'Avial', 'category' => 'Main Course', 'serving_size' => 150, 'serving_unit' => 'g', 'calories' => 120, 'protein' => 3.0, 'carbs' => 12.0, 'fats' => 7.0, 'is_custom' => false],
            ['name' => 'Olan', 'category' => 'Main Course', 'serving_size' => 150, 'serving_unit' => 'g', 'calories' => 90, 'protein' => 2.0, 'carbs' => 8.0, 'fats' => 6.0, 'is_custom' => false],
            ['name' => 'Cabbage Thoran', 'category' => 'Main Course', 'serving_size' => 100, 'serving_unit' => 'g', 'calories' => 80, 'protein' => 2.5, 'carbs' => 8.0, 'fats' => 4.5, 'is_custom' => false],
            ['name' => 'Sambar', 'category' => 'Main Course', 'serving_size' => 200, 'serving_unit' => 'ml', 'calories' => 90, 'protein' => 4.0, 'carbs' => 14.0, 'fats' => 2.5, 'is_custom' => false],
            ['name' => 'Rasam', 'category' => 'Main Course', 'serving_size' => 200, 'serving_unit' => 'ml', 'calories' => 50, 'protein' => 2.0, 'carbs' => 8.0, 'fats' => 1.5, 'is_custom' => false],

            // Seafood
            ['name' => 'Karimeen Fry (Pearl Spot)', 'category' => 'Main Course', 'serving_size' => 150, 'serving_unit' => 'g', 'calories' => 220, 'protein' => 24.0, 'carbs' => 2.0, 'fats' => 13.0, 'is_custom' => false],
            ['name' => 'Mackerel Fry', 'category' => 'Main Course', 'serving_size' => 120, 'serving_unit' => 'g', 'calories' => 200, 'protein' => 22.0, 'carbs' => 1.0, 'fats' => 12.0, 'is_custom' => false],
            ['name' => 'Prawn Curry', 'category' => 'Main Course', 'serving_size' => 150, 'serving_unit' => 'g', 'calories' => 160, 'protein' => 20.0, 'carbs' => 5.0, 'fats' => 7.0, 'is_custom' => false],

            // Snacks
            ['name' => 'Banana Chips', 'category' => 'Snacks', 'serving_size' => 100, 'serving_unit' => 'g', 'calories' => 520, 'protein' => 2.0, 'carbs' => 58.0, 'fats' => 31.0, 'is_custom' => false],
            ['name' => 'Tapioca Chips', 'category' => 'Snacks', 'serving_size' => 100, 'serving_unit' => 'g', 'calories' => 500, 'protein' => 1.5, 'carbs' => 60.0, 'fats' => 28.0, 'is_custom' => false],
            ['name' => 'Parippu Vada', 'category' => 'Snacks', 'serving_size' => 60, 'serving_unit' => 'g', 'calories' => 140, 'protein' => 5.0, 'carbs' => 16.0, 'fats' => 6.0, 'is_custom' => false],
            ['name' => 'Boiled Tapioca', 'category' => 'Snacks', 'serving_size' => 150, 'serving_unit' => 'g', 'calories' => 160, 'protein' => 0.6, 'carbs' => 38.0, 'fats' => 0.3, 'is_custom' => false],

            // Sweets & Desserts
            ['name' => 'Ada Pradhaman (Payasam)', 'category' => 'Desserts', 'serving_size' => 150, 'serving_unit' => 'ml', 'calories' => 180, 'protein' => 3.0, 'carbs' => 32.0, 'fats' => 5.0, 'is_custom' => false],
            ['name' => 'Paal Payasam', 'category' => 'Desserts', 'serving_size' => 150, 'serving_unit' => 'ml', 'calories' => 160, 'protein' => 5.0, 'carbs' => 28.0, 'fats' => 4.0, 'is_custom' => false],
            ['name' => 'Banana Halwa', 'category' => 'Desserts', 'serving_size' => 80, 'serving_unit' => 'g', 'calories' => 220, 'protein' => 1.5, 'carbs' => 42.0, 'fats' => 6.0, 'is_custom' => false],
            ['name' => 'Ela Ada', 'category' => 'Desserts', 'serving_size' => 70, 'serving_unit' => 'g', 'calories' => 140, 'protein' => 2.0, 'carbs' => 28.0, 'fats' => 3.0, 'is_custom' => false],

            // Beverages
            ['name' => 'Filter Coffee', 'category' => 'Beverages', 'serving_size' => 150, 'serving_unit' => 'ml', 'calories' => 50, 'protein' => 2.0, 'carbs' => 6.0, 'fats' => 2.0, 'is_custom' => false],
            ['name' => 'Sulaimani (Black Tea)', 'category' => 'Beverages', 'serving_size' => 150, 'serving_unit' => 'ml', 'calories' => 5, 'protein' => 0.0, 'carbs' => 1.0, 'fats' => 0.0, 'is_custom' => false],
            ['name' => 'Tender Coconut Water', 'category' => 'Beverages', 'serving_size' => 240, 'serving_unit' => 'ml', 'calories' => 45, 'protein' => 1.7, 'carbs' => 9.0, 'fats' => 0.5, 'is_custom' => false],
            ['name' => 'Sambharam (Buttermilk)', 'category' => 'Beverages', 'serving_size' => 200, 'serving_unit' => 'ml', 'calories' => 40, 'protein' => 2.0, 'carbs' => 5.0, 'fats' => 1.0, 'is_custom' => false],

            // Condiments
            ['name' => 'Coconut Chutney', 'category' => 'Condiments', 'serving_size' => 30, 'serving_unit' => 'g', 'calories' => 80, 'protein' => 1.5, 'carbs' => 6.0, 'fats' => 6.0, 'is_custom' => false],
            ['name' => 'Mango Pickle', 'category' => 'Condiments', 'serving_size' => 15, 'serving_unit' => 'g', 'calories' => 60, 'protein' => 0.5, 'carbs' => 4.0, 'fats' => 5.0, 'is_custom' => false],
            ['name' => 'Papad', 'category' => 'Condiments', 'serving_size' => 10, 'serving_unit' => 'g', 'calories' => 50, 'protein' => 2.0, 'carbs' => 8.0, 'fats' => 1.5, 'is_custom' => false],
        ];

        foreach ($keralaFoods as $food) {
            FoodItem::create($food);
        }

        $this->command->info('Kerala food items seeded successfully!');
        $this->command->info('Total items added: ' . count($keralaFoods));
    }
}
