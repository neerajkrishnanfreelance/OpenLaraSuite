<?php

namespace App\Http\Controllers;

use App\Models\BudgetCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BudgetCategoryController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        $categories = BudgetCategory::forUser($user->id)
            ->withCount('entries')
            ->orderBy('name')
            ->get();
        
        return Inertia::render('Budget/Categories/Index', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'color' => 'required|string|max:7',
            'icon' => 'required|string|max:50',
            'is_active' => 'boolean',
        ]);

        $category = BudgetCategory::create([
            'user_id' => $request->user()->id,
            ...$validated,
        ]);

        return redirect()->back()->with('success', 'Category created successfully.');
    }

    public function update(Request $request, BudgetCategory $category)
    {
        // Ensure user owns this category
        if ($category->user_id !== $request->user()->id) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'color' => 'required|string|max:7',
            'icon' => 'required|string|max:50',
            'is_active' => 'boolean',
        ]);

        $category->update($validated);

        return redirect()->back()->with('success', 'Category updated successfully.');
    }

    public function destroy(Request $request, BudgetCategory $category)
    {
        // Ensure user owns this category
        if ($category->user_id !== $request->user()->id) {
            abort(403);
        }

        // Check if category has entries
        if ($category->entries()->count() > 0) {
            return redirect()->back()->with('error', 'Cannot delete category with existing entries.');
        }

        $category->delete();

        return redirect()->back()->with('success', 'Category deleted successfully.');
    }
}
