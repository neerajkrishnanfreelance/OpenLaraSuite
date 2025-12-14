<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use Illuminate\Http\Request;

class StockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $stocks = Stock::orderBy('name')->paginate(10);
        return \Inertia\Inertia::render('Stocks/Definitions/Index', [
            'stocks' => $stocks,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $accounts = \App\Models\Account::where('is_active', true)->get();
        return \Inertia\Inertia::render('Stocks/Definitions/Create', [
            'accounts' => $accounts,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'symbol' => 'required|string|uppercase|unique:stocks,symbol|max:10',
            'name' => 'required|string|max:255',
            'sector' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'asset_account_id' => 'nullable|exists:accounts,id',
            'pnl_account_id' => 'nullable|exists:accounts,id',
        ]);

        Stock::create($validated);

        return redirect()->route('stocks-definitions.index')->with('success', 'Stock definition created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Stock $stock)
    {
        $accounts = \App\Models\Account::where('is_active', true)->get();
        return \Inertia\Inertia::render('Stocks/Definitions/Edit', [
            'stock' => $stock,
            'accounts' => $accounts,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Stock $stock)
    {
        $validated = $request->validate([
            'symbol' => 'required|string|uppercase|max:10|unique:stocks,symbol,' . $stock->id,
            'name' => 'required|string|max:255',
            'sector' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'asset_account_id' => 'nullable|exists:accounts,id',
            'pnl_account_id' => 'nullable|exists:accounts,id',
        ]);

        $stock->update($validated);

        return redirect()->route('stocks-definitions.index')->with('success', 'Stock definition updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Stock $stock)
    {
        $stock->delete();
        return redirect()->route('stocks-definitions.index')->with('success', 'Stock definition deleted successfully.');
    }
}
