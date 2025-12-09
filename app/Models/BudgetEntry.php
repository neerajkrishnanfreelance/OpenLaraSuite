<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BudgetEntry extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'budget_plan_id',
        'budget_category_id',
        'entry_date',
        'amount',
        'description',
        'payment_method',
        'receipt_url',
    ];

    protected $casts = [
        'entry_date' => 'date',
        'amount' => 'decimal:2',
    ];

    /**
     * Get the user that owns the entry.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the budget plan that owns the entry.
     */
    public function budgetPlan(): BelongsTo
    {
        return $this->belongsTo(BudgetPlan::class);
    }

    /**
     * Get the budget category that owns the entry.
     */
    public function budgetCategory(): BelongsTo
    {
        return $this->belongsTo(BudgetCategory::class);
    }

    /**
     * Scope a query to only include entries for a specific user.
     */
    public function scopeForUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Scope a query to only include entries for a specific date.
     */
    public function scopeForDate($query, $date)
    {
        return $query->whereDate('entry_date', $date);
    }

    /**
     * Scope a query to only include entries within a date range.
     */
    public function scopeForDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('entry_date', [$startDate, $endDate]);
    }

    /**
     * Scope a query to only include entries for a specific category.
     */
    public function scopeForCategory($query, $categoryId)
    {
        return $query->where('budget_category_id', $categoryId);
    }
}
