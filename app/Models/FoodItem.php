<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FoodItem extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'brand',
        'serving_size',
        'serving_unit',
        'calories',
        'protein',
        'carbs',
        'fats',
        'fiber',
        'sugar',
        'sodium',
        'category',
        'is_custom',
        'created_by',
    ];

    protected $casts = [
        'serving_size' => 'decimal:2',
        'calories' => 'decimal:2',
        'protein' => 'decimal:2',
        'carbs' => 'decimal:2',
        'fats' => 'decimal:2',
        'fiber' => 'decimal:2',
        'sugar' => 'decimal:2',
        'sodium' => 'decimal:2',
        'is_custom' => 'boolean',
    ];

    /**
     * Get the user who created this food item
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get all food logs for this item
     */
    public function foodLogs()
    {
        return $this->hasMany(DailyFoodLog::class);
    }

    /**
     * Scope to filter by category
     */
    public function scopeCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    /**
     * Scope to filter custom items
     */
    public function scopeCustom($query)
    {
        return $query->where('is_custom', true);
    }

    /**
     * Scope to filter system items
     */
    public function scopeSystem($query)
    {
        return $query->where('is_custom', false);
    }

    /**
     * Search scope
     */
    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
              ->orWhere('brand', 'like', "%{$search}%");
        });
    }
}
