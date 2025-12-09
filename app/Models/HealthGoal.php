<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HealthGoal extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'daily_calorie_target',
        'daily_protein_target',
        'daily_carbs_target',
        'daily_fats_target',
        'weekly_workout_target',
        'weekly_workout_minutes_target',
        'current_weight',
        'target_weight',
        'weight_unit',
        'daily_water_target',
        'start_date',
        'target_date',
    ];

    protected $casts = [
        'daily_calorie_target' => 'decimal:2',
        'daily_protein_target' => 'decimal:2',
        'daily_carbs_target' => 'decimal:2',
        'daily_fats_target' => 'decimal:2',
        'weekly_workout_target' => 'integer',
        'weekly_workout_minutes_target' => 'integer',
        'current_weight' => 'decimal:2',
        'target_weight' => 'decimal:2',
        'daily_water_target' => 'decimal:2',
        'start_date' => 'date',
        'target_date' => 'date',
    ];

    /**
     * Get the user
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Calculate weight progress percentage
     */
    public function getWeightProgressAttribute()
    {
        if (!$this->current_weight || !$this->target_weight) {
            return 0;
        }

        $startWeight = $this->current_weight;
        $targetWeight = $this->target_weight;
        $currentWeight = $this->user->current_weight ?? $this->current_weight;

        $totalChange = abs($targetWeight - $startWeight);
        $currentChange = abs($currentWeight - $startWeight);

        if ($totalChange == 0) {
            return 100;
        }

        return min(100, round(($currentChange / $totalChange) * 100, 2));
    }

    /**
     * Get days remaining to target
     */
    public function getDaysRemainingAttribute()
    {
        if (!$this->target_date) {
            return null;
        }

        return now()->diffInDays($this->target_date, false);
    }
}
