<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Casts\Attribute;

class BudgetAllocation extends Model
{
    use HasFactory;

    protected $fillable = [
        'budget_plan_id',
        'budget_category_id',
        'allocated_amount',
        'notes',
    ];

    protected $casts = [
        'allocated_amount' => 'decimal:2',
    ];

    /**
     * Get the budget plan that owns the allocation.
     */
    public function budgetPlan(): BelongsTo
    {
        return $this->belongsTo(BudgetPlan::class);
    }

    /**
     * Get the budget category that owns the allocation.
     */
    public function budgetCategory(): BelongsTo
    {
        return $this->belongsTo(BudgetCategory::class);
    }

    /**
     * Get the total spent amount for this allocation.
     */
    protected function spentAmount(): Attribute
    {
        return Attribute::make(
            get: fn () => BudgetEntry::where('budget_plan_id', $this->budget_plan_id)
                ->where('budget_category_id', $this->budget_category_id)
                ->sum('amount')
        );
    }

    /**
     * Get the remaining amount for this allocation.
     */
    protected function remainingAmount(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->allocated_amount - $this->spent_amount
        );
    }
}
