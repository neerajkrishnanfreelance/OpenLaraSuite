<?php

namespace App\Http\Controllers;

use App\Models\BudgetPlan;
use App\Models\BudgetCategory;
use App\Models\BudgetEntry;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class BudgetDashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Get active budget plans with allocations and entries count
        $activePlans = BudgetPlan::forUser($user->id)
            ->active()
            ->with(['allocations.budgetCategory'])
            ->withCount('entries')
            ->get();
        
        // Monthly trend (last 6 months)
        $monthlyTrend = [];
        for ($i = 5; $i >= 0; $i--) {
            $month = Carbon::now()->subMonths($i);
            $monthStart = $month->copy()->startOfMonth();
            $monthEnd = $month->copy()->endOfMonth();
            
            $monthSpent = BudgetEntry::forUser($user->id)
                ->forDateRange($monthStart, $monthEnd)
                ->sum('amount');
            
            $monthBudget = BudgetPlan::forUser($user->id)
                ->forDateRange($monthStart, $monthEnd)
                ->sum('total_amount');
            
            $monthlyTrend[] = [
                'month' => $month->format('M Y'),
                'budget' => $monthBudget,
                'spent' => $monthSpent,
            ];
        }
        
        // Get all categories for quick entry
        $categories = BudgetCategory::forUser($user->id)
            ->active()
            ->orderBy('name')
            ->get();
        
        return Inertia::render('Budget/Dashboard', [
            'activePlans' => $activePlans,
            'monthlyTrend' => $monthlyTrend,
            'categories' => $categories,
        ]);
    }
}
