<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User; // Added for relationship
use App\Models\FoodItem; // Added for relationship

class MealPlan extends Model
{
    protected $fillable = [
        'user_id',
        'date',
        'meal_type',
        'food_item_id',
        'serving_amount',
        'calories',
        'protein',
        'carbs',
        'fats',
    ];

    protected $casts = [
        'date' => 'date',
        'serving_amount' => 'decimal:2',
        'calories' => 'decimal:2',
        'protein' => 'decimal:2',
        'carbs' => 'decimal:2',
        'fats' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function foodItem()
    {
        return $this->belongsTo(FoodItem::class);
    }
}
