<?php

namespace App\Http\Controllers;

use App\Models\BudgetEntry;
use App\Models\BudgetCategory;
use App\Models\BudgetPlan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class BudgetEntryController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        $query = BudgetEntry::forUser($user->id)
            ->with(['budgetCategory', 'budgetPlan']);
        
        // Apply filters
        if ($request->has('category_id')) {
            $query->where('budget_category_id', $request->category_id);
        }
        
        if ($request->has('plan_id')) {
            $query->where('budget_plan_id', $request->plan_id);
        }
        
        if ($request->has('start_date') && $request->has('end_date')) {
            $query->forDateRange($request->start_date, $request->end_date);
        }
        
        $entries = $query->orderBy('entry_date', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate(20);
        
        $categories = BudgetCategory::forUser($user->id)
            ->active()
            ->orderBy('name')
            ->get();
        
        $plans = BudgetPlan::forUser($user->id)
            ->active()
            ->orderBy('start_date', 'desc')
            ->get();
        
        return Inertia::render('Budget/Entries/Index', [
            'entries' => $entries,
            'categories' => $categories,
            'plans' => $plans,
            'filters' => $request->only(['category_id', 'plan_id', 'start_date', 'end_date']),
        ]);
    }

    public function calendar(Request $request)
    {
        $user = $request->user();
        $month = $request->input('month', Carbon::now()->format('Y-m'));
        $currentMonth = Carbon::parse($month . '-01');
        
        // Get entries for the month
        $monthStart = $currentMonth->copy()->startOfMonth();
        $monthEnd = $currentMonth->copy()->endOfMonth();
        
        $entries = BudgetEntry::forUser($user->id)
            ->forDateRange($monthStart, $monthEnd)
            ->with(['budgetCategory', 'budgetPlan'])
            ->orderBy('entry_date')
            ->get()
            ->groupBy(function ($entry) {
                return $entry->entry_date->format('Y-m-d');
            });
        
        // Get active plan for the month
        $activePlan = BudgetPlan::forUser($user->id)
            ->active()
            ->forDateRange($monthStart, $monthEnd)
            ->first();
        
        $categories = BudgetCategory::forUser($user->id)
            ->active()
            ->orderBy('name')
            ->get();
        
        $plans = BudgetPlan::forUser($user->id)
            ->active()
            ->orderBy('start_date', 'desc')
            ->get();
        
        return Inertia::render('Budget/Entries/Calendar', [
            'entries' => $entries,
            'currentMonth' => $currentMonth->format('Y-m'),
            'activePlan' => $activePlan,
            'categories' => $categories,
            'plans' => $plans,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'budget_plan_id' => 'nullable|exists:budget_plans,id',
            'budget_category_id' => 'required|exists:budget_categories,id',
            'entry_date' => 'required|date',
            'amount' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'payment_method' => 'required|in:cash,card,upi,bank_transfer,other',
            'receipt_url' => 'nullable|string',
        ]);

        $entry = BudgetEntry::create([
            'user_id' => $request->user()->id,
            ...$validated,
        ]);

        return redirect()->back()->with('success', 'Entry created successfully.');
    }

    public function update(Request $request, BudgetEntry $entry)
    {
        // Ensure user owns this entry
        if ($entry->user_id !== $request->user()->id) {
            abort(403);
        }

        $validated = $request->validate([
            'budget_plan_id' => 'nullable|exists:budget_plans,id',
            'budget_category_id' => 'required|exists:budget_categories,id',
            'entry_date' => 'required|date',
            'amount' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'payment_method' => 'required|in:cash,card,upi,bank_transfer,other',
            'receipt_url' => 'nullable|string',
        ]);

        $entry->update($validated);

        return redirect()->back()->with('success', 'Entry updated successfully.');
    }

    public function destroy(Request $request, BudgetEntry $entry)
    {
        // Ensure user owns this entry
        if ($entry->user_id !== $request->user()->id) {
            abort(403);
        }

        $entry->delete();

        return redirect()->back()->with('success', 'Entry deleted successfully.');
    }
}
