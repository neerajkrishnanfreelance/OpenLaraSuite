<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkoutType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'category',
        'calories_per_minute',
        'description',
        'icon',
    ];

    protected $casts = [
        'calories_per_minute' => 'decimal:2',
    ];

    /**
     * Get all workout logs for this type
     */
    public function workoutLogs()
    {
        return $this->hasMany(WorkoutLog::class);
    }

    /**
     * Scope to filter by category
     */
    public function scopeCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    /**
     * Scope for cardio workouts
     */
    public function scopeCardio($query)
    {
        return $query->where('category', 'cardio');
    }

    /**
     * Scope for strength workouts
     */
    public function scopeStrength($query)
    {
        return $query->where('category', 'strength');
    }
}
