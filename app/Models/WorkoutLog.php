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
        'distance',
        'distance_unit',
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
        'distance' => 'decimal:2',
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
     * Calculate calories burned based on duration, intensity, and optionally distance
     */
    public static function calculateCalories(WorkoutType $workoutType, $durationMinutes, $intensity, $distance = null, $distanceUnit = 'km')
    {
        // If distance is provided for cardio workouts, use distance-based calculation
        if ($distance && $workoutType->category === 'cardio') {
            return self::calculateCaloriesFromDistance($workoutType, $distance, $distanceUnit, $intensity);
        }
        
        // Otherwise use time-based calculation
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

    /**
     * Calculate calories from distance for cardio activities
     * Uses MET (Metabolic Equivalent of Task) values and distance
     */
    private static function calculateCaloriesFromDistance(WorkoutType $workoutType, $distance, $distanceUnit, $intensity)
    {
        // Convert distance to kilometers for standardization
        $distanceKm = match($distanceUnit) {
            'mi' => $distance * 1.60934,
            'm' => $distance / 1000,
            default => $distance, // km
        };

        // Average body weight assumption (70kg) - could be made configurable per user
        $bodyWeightKg = 70;

        // Determine MET value based on workout type and intensity
        // MET values are approximate and based on common activities
        $met = match(strtolower($workoutType->name)) {
            'cycling', '🚴 cycling' => match($intensity) {
                'low' => 6.0,      // Leisurely cycling (~16 km/h)
                'medium' => 8.0,   // Moderate cycling (~20 km/h)
                'high' => 10.0,    // Vigorous cycling (~25+ km/h)
                default => 8.0,
            },
            'running', '🏃 running' => match($intensity) {
                'low' => 7.0,      // Light jogging
                'medium' => 9.8,   // Moderate running
                'high' => 12.3,    // Fast running
                default => 9.8,
            },
            'walking', '🚶 walking' => match($intensity) {
                'low' => 3.0,
                'medium' => 3.5,
                'high' => 4.5,
                default => 3.5,
            },
            'swimming', '🏊 swimming' => match($intensity) {
                'low' => 6.0,
                'medium' => 8.0,
                'high' => 10.0,
                default => 8.0,
            },
            default => match($intensity) {
                'low' => 5.0,
                'medium' => 7.0,
                'high' => 9.0,
                default => 7.0,
            },
        };

        // Calculate duration from distance and average speed
        // Estimate speed based on MET and activity type
        $avgSpeedKmh = match(strtolower($workoutType->name)) {
            'cycling', '🚴 cycling' => match($intensity) {
                'low' => 16,
                'medium' => 20,
                'high' => 25,
                default => 20,
            },
            'running', '🏃 running' => match($intensity) {
                'low' => 8,
                'medium' => 10,
                'high' => 12,
                default => 10,
            },
            'walking', '🚶 walking' => match($intensity) {
                'low' => 4,
                'medium' => 5,
                'high' => 6,
                default => 5,
            },
            default => 15,
        };

        $durationHours = $distanceKm / $avgSpeedKmh;

        // Calories = MET × body weight (kg) × duration (hours)
        $calories = $met * $bodyWeightKg * $durationHours;

        return round($calories, 2);
    }

    /**
     * Get speed (distance/time)
     * Returns speed in the same unit as distance per hour
     */
    public function getSpeedAttribute()
    {
        if (!$this->distance || !$this->duration_minutes) {
            return null;
        }

        // Convert minutes to hours
        $hours = $this->duration_minutes / 60;
        $speed = $this->distance / $hours;

        return round($speed, 2);
    }

    /**
     * Get pace (time/distance)
     * Returns minutes per distance unit
     */
    public function getPaceAttribute()
    {
        if (!$this->distance || !$this->duration_minutes) {
            return null;
        }

        $pace = $this->duration_minutes / $this->distance;
        return round($pace, 2);
    }

    /**
     * Get formatted distance with unit
     */
    public function getFormattedDistanceAttribute()
    {
        if (!$this->distance) {
            return null;
        }

        return $this->distance . ' ' . ($this->distance_unit ?? 'km');
    }
}
