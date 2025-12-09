<?php

namespace App\Http\Controllers;

use App\Models\FoodItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FoodItemController extends Controller
{
    public function index(Request $request)
    {
        $query = FoodItem::query();

        // Search
        if ($request->has('search') && $request->search) {
            $query->search($request->search);
        }

        // Filter by category
        if ($request->has('category') && $request->category) {
            $query->category($request->category);
        }

        // Filter custom vs system
        if ($request->has('type')) {
            if ($request->type === 'custom') {
                $query->custom();
            } elseif ($request->type === 'system') {
                $query->system();
            }
        }

        $foodItems = $query->orderBy('name')->paginate(20);

        return Inertia::render('Health/FoodItems/Index', [
            'foodItems' => $foodItems,
            'filters' => $request->only(['search', 'category', 'type']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'brand' => 'nullable|string|max:255',
            'serving_size' => 'required|numeric|min:0',
            'serving_unit' => 'required|string|max:50',
            'calories' => 'required|numeric|min:0',
            'protein' => 'nullable|numeric|min:0',
            'carbs' => 'nullable|numeric|min:0',
            'fats' => 'nullable|numeric|min:0',
            'fiber' => 'nullable|numeric|min:0',
            'sugar' => 'nullable|numeric|min:0',
            'sodium' => 'nullable|numeric|min:0',
            'category' => 'nullable|string|max:50',
        ]);

        $validated['is_custom'] = true;
        $validated['created_by'] = $request->user()->id;

        FoodItem::create($validated);

        return redirect()->back()->with('success', 'Food item created successfully.');
    }

    public function update(Request $request, FoodItem $foodItem)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'brand' => 'nullable|string|max:255',
            'serving_size' => 'required|numeric|min:0',
            'serving_unit' => 'required|string|max:50',
            'calories' => 'required|numeric|min:0',
            'protein' => 'nullable|numeric|min:0',
            'carbs' => 'nullable|numeric|min:0',
            'fats' => 'nullable|numeric|min:0',
            'fiber' => 'nullable|numeric|min:0',
            'sugar' => 'nullable|numeric|min:0',
            'sodium' => 'nullable|numeric|min:0',
            'category' => 'nullable|string|max:50',
        ]);

        $foodItem->update($validated);

        return redirect()->back()->with('success', 'Food item updated successfully.');
    }

    public function destroy(FoodItem $foodItem)
    {
        $foodItem->delete();

        return redirect()->back()->with('success', 'Food item deleted successfully.');
    }

    public function search(Request $request)
    {
        $search = $request->input('q', '');
        
        $foodItems = FoodItem::search($search)
            ->limit(20)
            ->get();

        return response()->json($foodItems);
    }
}
