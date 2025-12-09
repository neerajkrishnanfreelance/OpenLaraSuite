<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class DailyFoodLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'food_item_id',
        'meal_type',
        'servings',
        'consumed_at',
        'total_calories',
        'total_protein',
        'total_carbs',
        'total_fats',
        'total_fiber',
        'notes',
    ];

    protected $casts = [
        'servings' => 'decimal:2',
        'total_calories' => 'decimal:2',
        'total_protein' => 'decimal:2',
        'total_carbs' => 'decimal:2',
        'total_fats' => 'decimal:2',
        'total_fiber' => 'decimal:2',
        'consumed_at' => 'datetime',
    ];

    /**
     * Get the user who logged this food
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the food item
     */
    public function foodItem()
    {
        return $this->belongsTo(FoodItem::class);
    }

    /**
     * Scope to filter by date
     */
    public function scopeForDate($query, $date)
    {
        return $query->whereDate('consumed_at', $date);
    }

    /**
     * Scope to filter by date range
     */
    public function scopeDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('consumed_at', [$startDate, $endDate]);
    }

    /**
     * Scope to filter by meal type
     */
    public function scopeMealType($query, $mealType)
    {
        return $query->where('meal_type', $mealType);
    }

    /**
     * Scope to filter by user
     */
    public function scopeForUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Calculate nutrition values based on servings
     */
    public static function calculateNutrition(FoodItem $foodItem, $servings)
    {
        return [
            'total_calories' => $foodItem->calories * $servings,
            'total_protein' => $foodItem->protein * $servings,
            'total_carbs' => $foodItem->carbs * $servings,
            'total_fats' => $foodItem->fats * $servings,
            'total_fiber' => $foodItem->fiber * $servings,
        ];
    }
}
