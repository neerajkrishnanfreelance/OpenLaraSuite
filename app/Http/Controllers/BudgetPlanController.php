<?php

namespace App\Http\Controllers;

use App\Models\BudgetPlan;
use App\Models\BudgetCategory;
use App\Models\BudgetAllocation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BudgetPlanController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        $plans = BudgetPlan::forUser($user->id)
            ->with(['allocations.budgetCategory'])
            ->withCount('entries')
            ->orderBy('start_date', 'desc')
            ->get()
            ->map(function ($plan) {
                return [
                    'id' => $plan->id,
                    'name' => $plan->name,
                    'budget_type' => $plan->budget_type,
                    'start_date' => $plan->start_date->format('Y-m-d'),
                    'end_date' => $plan->end_date->format('Y-m-d'),
                    'total_amount' => $plan->total_amount,
                    'currency' => $plan->currency,
                    'status' => $plan->status,
                    'spent_amount' => $plan->spent_amount,
                    'remaining_amount' => $plan->remaining_amount,
                    'progress_percentage' => $plan->progress_percentage,
                    'entries_count' => $plan->entries_count,
                    'allocations' => $plan->allocations,
                ];
            });
        
        return Inertia::render('Budget/Plans/Index', [
            'plans' => $plans,
        ]);
    }

    public function create(Request $request)
    {
        $categories = BudgetCategory::forUser($request->user()->id)
            ->active()
            ->orderBy('name')
            ->get();
        
        return Inertia::render('Budget/Plans/Create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'budget_type' => 'required|in:monthly,daily',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'total_amount' => 'required|numeric|min:0',
            'currency' => 'required|string|max:3',
            'status' => 'required|in:active,completed,cancelled',
            'notes' => 'nullable|string',
            'allocations' => 'nullable|array',
            'allocations.*.budget_category_id' => 'required|exists:budget_categories,id',
            'allocations.*.allocated_amount' => 'required|numeric|min:0',
            'allocations.*.notes' => 'nullable|string',
        ]);

        $plan = BudgetPlan::create([
            'user_id' => $request->user()->id,
            'name' => $validated['name'],
            'budget_type' => $validated['budget_type'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'total_amount' => $validated['total_amount'],
            'currency' => $validated['currency'],
            'status' => $validated['status'],
            'notes' => $validated['notes'] ?? null,
        ]);

        // Create allocations if provided
        if (isset($validated['allocations'])) {
            foreach ($validated['allocations'] as $allocation) {
                BudgetAllocation::create([
                    'budget_plan_id' => $plan->id,
                    'budget_category_id' => $allocation['budget_category_id'],
                    'allocated_amount' => $allocation['allocated_amount'],
                    'notes' => $allocation['notes'] ?? null,
                ]);
            }
        }

        return redirect()->route('budget.plans.show', $plan->id)
            ->with('success', 'Budget plan created successfully.');
    }

    public function show(Request $request, BudgetPlan $plan)
    {
        // Ensure user owns this plan
        if ($plan->user_id !== $request->user()->id) {
            abort(403);
        }

        $plan->load([
            'allocations.budgetCategory',
            'entries.budgetCategory'
        ]);

        // Add calculated fields
        $planData = [
            'id' => $plan->id,
            'name' => $plan->name,
            'budget_type' => $plan->budget_type,
            'start_date' => $plan->start_date->format('Y-m-d'),
            'end_date' => $plan->end_date->format('Y-m-d'),
            'total_amount' => $plan->total_amount,
            'currency' => $plan->currency,
            'status' => $plan->status,
            'notes' => $plan->notes,
            'spent_amount' => $plan->spent_amount,
            'remaining_amount' => $plan->remaining_amount,
            'progress_percentage' => $plan->progress_percentage,
            'allocations' => $plan->allocations->map(function ($allocation) {
                return [
                    'id' => $allocation->id,
                    'budget_category_id' => $allocation->budget_category_id,
                    'category' => $allocation->budgetCategory,
                    'allocated_amount' => $allocation->allocated_amount,
                    'spent_amount' => $allocation->spent_amount,
                    'remaining_amount' => $allocation->remaining_amount,
                    'notes' => $allocation->notes,
                ];
            }),
            'entries' => $plan->entries,
        ];

        $categories = BudgetCategory::forUser($request->user()->id)
            ->active()
            ->orderBy('name')
            ->get();

        return Inertia::render('Budget/Plans/Show', [
            'plan' => $planData,
            'categories' => $categories,
        ]);
    }

    public function edit(Request $request, BudgetPlan $plan)
    {
        // Ensure user owns this plan
        if ($plan->user_id !== $request->user()->id) {
            abort(403);
        }

        $plan->load('allocations.budgetCategory');

        $categories = BudgetCategory::forUser($request->user()->id)
            ->active()
            ->orderBy('name')
            ->get();

        return Inertia::render('Budget/Plans/Edit', [
            'plan' => $plan,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, BudgetPlan $plan)
    {
        // Ensure user owns this plan
        if ($plan->user_id !== $request->user()->id) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'budget_type' => 'required|in:monthly,daily',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'total_amount' => 'required|numeric|min:0',
            'currency' => 'required|string|max:3',
            'status' => 'required|in:active,completed,cancelled',
            'notes' => 'nullable|string',
            'allocations' => 'nullable|array',
            'allocations.*.id' => 'nullable|exists:budget_allocations,id',
            'allocations.*.budget_category_id' => 'required|exists:budget_categories,id',
            'allocations.*.allocated_amount' => 'required|numeric|min:0',
            'allocations.*.notes' => 'nullable|string',
        ]);

        $plan->update([
            'name' => $validated['name'],
            'budget_type' => $validated['budget_type'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'total_amount' => $validated['total_amount'],
            'currency' => $validated['currency'],
            'status' => $validated['status'],
            'notes' => $validated['notes'] ?? null,
        ]);

        // Update or create allocations
        if (isset($validated['allocations'])) {
            $existingAllocationIds = [];
            
            foreach ($validated['allocations'] as $allocationData) {
                if (isset($allocationData['id'])) {
                    // Update existing allocation
                    $allocation = BudgetAllocation::find($allocationData['id']);
                    if ($allocation && $allocation->budget_plan_id === $plan->id) {
                        $allocation->update([
                            'budget_category_id' => $allocationData['budget_category_id'],
                            'allocated_amount' => $allocationData['allocated_amount'],
                            'notes' => $allocationData['notes'] ?? null,
                        ]);
                        $existingAllocationIds[] = $allocation->id;
                    }
                } else {
                    // Create new allocation
                    $newAllocation = BudgetAllocation::create([
                        'budget_plan_id' => $plan->id,
                        'budget_category_id' => $allocationData['budget_category_id'],
                        'allocated_amount' => $allocationData['allocated_amount'],
                        'notes' => $allocationData['notes'] ?? null,
                    ]);
                    $existingAllocationIds[] = $newAllocation->id;
                }
            }
            
            // Delete allocations not in the request
            BudgetAllocation::where('budget_plan_id', $plan->id)
                ->whereNotIn('id', $existingAllocationIds)
                ->delete();
        }

        return redirect()->route('budget.plans.show', $plan->id)
            ->with('success', 'Budget plan updated successfully.');
    }

    public function destroy(Request $request, BudgetPlan $plan)
    {
        // Ensure user owns this plan
        if ($plan->user_id !== $request->user()->id) {
            abort(403);
        }

        $plan->delete();

        return redirect()->route('budget.plans.index')
            ->with('success', 'Budget plan deleted successfully.');
    }
}
