<?php

namespace App\Http\Controllers;

use App\Models\TodoCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TodoCategoryController extends Controller
{
    /**
     * Display a listing of categories.
     */
    public function index(Request $request)
    {
        $categories = TodoCategory::forUser($request->user()->id)
            ->withCount(['todos' => function ($query) {
                $query->where('is_completed', false);
            }])
            ->get();

        return Inertia::render('Todos/Categories', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created category.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'color' => 'required|string|max:7', // Hex color code
            'icon' => 'nullable|string|max:50',
        ]);

        $validated['user_id'] = $request->user()->id;

        TodoCategory::create($validated);

        return redirect()->back()->with('success', 'Category created successfully.');
    }

    /**
     * Update the specified category.
     */
    public function update(Request $request, TodoCategory $category)
    {
        // Authorize
        if ($category->user_id !== $request->user()->id) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'color' => 'required|string|max:7',
            'icon' => 'nullable|string|max:50',
        ]);

        $category->update($validated);

        return redirect()->back()->with('success', 'Category updated successfully.');
    }

    /**
     * Remove the specified category.
     */
    public function destroy(TodoCategory $category)
    {
        // Authorize
        if ($category->user_id !== request()->user()->id) {
            abort(403);
        }

        // Set category_id to null for all todos in this category
        $category->todos()->update(['category_id' => null]);
        
        $category->delete();

        return redirect()->back()->with('success', 'Category deleted successfully.');
    }
}
