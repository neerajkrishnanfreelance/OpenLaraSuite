<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Casts\Attribute;

class BudgetPlan extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'budget_type',
        'start_date',
        'end_date',
        'total_amount',
        'currency',
        'status',
        'notes',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'total_amount' => 'decimal:2',
    ];

    /**
     * Get the user that owns the budget plan.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the budget allocations for this plan.
     */
    public function allocations(): HasMany
    {
        return $this->hasMany(BudgetAllocation::class);
    }

    /**
     * Get the budget entries for this plan.
     */
    public function entries(): HasMany
    {
        return $this->hasMany(BudgetEntry::class);
    }

    /**
     * Get the total spent amount.
     */
    protected function spentAmount(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->entries()->sum('amount')
        );
    }

    /**
     * Get the remaining amount.
     */
    protected function remainingAmount(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->total_amount - $this->spent_amount
        );
    }

    /**
     * Get the progress percentage.
     */
    protected function progressPercentage(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->total_amount > 0 
                ? round(($this->spent_amount / $this->total_amount) * 100, 2)
                : 0
        );
    }

    /**
     * Scope a query to only include active plans.
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope a query to only include monthly plans.
     */
    public function scopeMonthly($query)
    {
        return $query->where('budget_type', 'monthly');
    }

    /**
     * Scope a query to only include daily plans.
     */
    public function scopeDaily($query)
    {
        return $query->where('budget_type', 'daily');
    }

    /**
     * Scope a query to only include plans for a specific user.
     */
    public function scopeForUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Scope a query to only include plans within a date range.
     */
    public function scopeForDateRange($query, $startDate, $endDate)
    {
        return $query->where(function ($q) use ($startDate, $endDate) {
            $q->whereBetween('start_date', [$startDate, $endDate])
              ->orWhereBetween('end_date', [$startDate, $endDate])
              ->orWhere(function ($q2) use ($startDate, $endDate) {
                  $q2->where('start_date', '<=', $startDate)
                     ->where('end_date', '>=', $endDate);
              });
        });
    }
}
