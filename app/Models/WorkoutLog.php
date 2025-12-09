<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkoutLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'workout_type_id',
        'duration_minutes',
        'intensity',
        'calories_burned',
        'performed_at',
        'sets',
        'reps',
        'weight',
        'notes',
    ];

    protected $casts = [
        'duration_minutes' => 'integer',
        'calories_burned' => 'decimal:2',
        'sets' => 'integer',
        'reps' => 'integer',
        'weight' => 'decimal:2',
        'performed_at' => 'datetime',
    ];

    /**
     * Get the user who logged this workout
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the workout type
     */
    public function workoutType()
    {
        return $this->belongsTo(WorkoutType::class);
    }

    /**
     * Scope to filter by date
     */
    public function scopeForDate($query, $date)
    {
        return $query->whereDate('performed_at', $date);
    }

    /**
     * Scope to filter by date range
     */
    public function scopeDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('performed_at', [$startDate, $endDate]);
    }

    /**
     * Scope to filter by user
     */
    public function scopeForUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Calculate calories burned based on duration and intensity
     */
    public static function calculateCalories(WorkoutType $workoutType, $durationMinutes, $intensity)
    {
        $baseCalories = $workoutType->calories_per_minute * $durationMinutes;
        
        // Adjust based on intensity
        $multiplier = match($intensity) {
            'low' => 0.7,
            'medium' => 1.0,
            'high' => 1.3,
            default => 1.0,
        };
        
        return round($baseCalories * $multiplier, 2);
    }
}
