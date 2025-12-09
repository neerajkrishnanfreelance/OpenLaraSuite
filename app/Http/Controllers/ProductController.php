<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Account;
use App\Models\Journal;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with(['expenseAccount', 'journal'])->latest()->paginate(10);
        return Inertia::render('ExpenseProducts/Index', [
            'products' => $products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('ExpenseProducts/Create', [
            'accounts' => Account::where('account_type', 'expense')->get(),
            'journals' => Journal::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'nullable|numeric',
            'is_expense' => 'boolean',
            'expense_account_id' => 'nullable|exists:accounts,id',
            'journal_id' => 'nullable|exists:journals,id',
        ]);

        Product::create($validated);

        return redirect()->route('expense-products.index')->with('success', 'Expense Product created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return Inertia::render('ExpenseProducts/Edit', [
            'product' => $product,
            'accounts' => Account::where('account_type', 'expense')->get(),
            'journals' => Journal::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'nullable|numeric',
            'is_expense' => 'boolean',
            'expense_account_id' => 'nullable|exists:accounts,id',
            'journal_id' => 'nullable|exists:journals,id',
        ]);

        $product->update($validated);

        return redirect()->route('expense-products.index')->with('success', 'Expense Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('expense-products.index')->with('success', 'Expense Product deleted successfully.');
    }
}
