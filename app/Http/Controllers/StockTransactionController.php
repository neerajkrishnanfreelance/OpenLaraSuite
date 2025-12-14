<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\AccountingJournalEntry;
use App\Models\AccountingJournalEntryLine;
use App\Models\StockTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class StockTransactionController extends Controller
{
    public function index()
    {
        $transactions = StockTransaction::with('user')
            ->orderBy('trade_date', 'desc')
            ->paginate(10);

        return Inertia::render('Stocks/Index', [
            'transactions' => $transactions,
        ]);
    }

    public function create()
    {
        // Fetch accounts for selection
        $accounts = Account::where('is_active', true)->get();
        // Fetch active stocks
        $stocks = \App\Models\Stock::where('is_active', true)->orderBy('symbol')->get();

        return Inertia::render('Stocks/Create', [
            'accounts' => $accounts,
            'stocks' => $stocks,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:buy,sell',
            'stock_id' => 'required|exists:stocks,id',
            'quantity' => 'required|numeric|min:0.0001',
            'price_per_unit' => 'required|numeric|min:0.01',
            'fees' => 'nullable|numeric|min:0',
            'trade_date' => 'required|date',
            'bank_account_id' => 'required|exists:accounts,id',
            'stock_account_id' => 'required|exists:accounts,id', // Asset account for stocks
            'pnl_account_id' => 'nullable|exists:accounts,id', // Required for sell usually
            'notes' => 'nullable|string',
        ]);

        $stock = \App\Models\Stock::findOrFail($validated['stock_id']);
        $stockSymbol = $stock->symbol;

        $total = $validated['quantity'] * $validated['price_per_unit'];
        $fees = $validated['fees'] ?? 0;
        
        // Net calculation
        $netAmount = ($validated['type'] === 'buy') ? ($total + $fees) : ($total - $fees);

        DB::transaction(function () use ($validated, $total, $fees, $netAmount, $stockSymbol, $request) {
            // 1. Create Stock Transaction
            $stockTx = StockTransaction::create([
                'user_id' => Auth::id(),
                'type' => $validated['type'],
                'stock_id' => $validated['stock_id'],
                'stock_symbol' => $stockSymbol,
                'quantity' => $validated['quantity'],
                'price_per_unit' => $validated['price_per_unit'],
                'total_amount' => $total,
                'fees' => $fees,
                'net_amount' => $netAmount,
                'trade_date' => $validated['trade_date'],
                'notes' => $validated['notes'],
            ]);

            // 2. Create Accounting Journal Entry
            $journal = \App\Models\Journal::firstOrCreate(
                ['name' => 'General Journal'],
                ['description' => 'Default General Journal']
            );

            $entry = AccountingJournalEntry::create([
                'journal_id' => $journal->id,
                'reference' => 'STK-' . $stockTx->id,
                'date' => $validated['trade_date'],
                'state' => 'posted', // "Post everything"
                'notes' => "Stock {$validated['type']}: {$stockSymbol} - {$validated['quantity']} @ {$validated['price_per_unit']}",
                'created_by' => Auth::id(),
                'posted_by' => Auth::id(),
                'posted_at' => now(),
            ]);

            // 3. Create Lines
            if ($validated['type'] === 'buy') {
                // Buy: Debit Stock Asset, Credit Bank
                
                // Credit Bank (Net Amount)
                AccountingJournalEntryLine::create([
                    'journal_entry_id' => $entry->id,
                    'account_id' => $validated['bank_account_id'],
                    'description' => "Purchase {$stockSymbol} (Cash Out)",
                    'debit' => 0,
                    'credit' => $netAmount,
                ]);

                // Debit Stock Asset
                AccountingJournalEntryLine::create([
                    'journal_entry_id' => $entry->id,
                    'account_id' => $validated['stock_account_id'],
                    'description' => "Stock Asset {$stockSymbol}",
                    'debit' => $netAmount,
                    'credit' => 0,
                ]);
            } else {
                // Sell
                // Debit Bank (Net Amount Received)
                AccountingJournalEntryLine::create([
                    'journal_entry_id' => $entry->id,
                    'account_id' => $validated['bank_account_id'],
                    'description' => "Sale {$stockSymbol} (Cash In)",
                    'debit' => $netAmount,
                    'credit' => 0,
                ]);

                $costBasis = $request->input('cost_basis');
                
                if ($costBasis) {
                     // Credit Asset (Cost)
                    AccountingJournalEntryLine::create([
                        'journal_entry_id' => $entry->id,
                        'account_id' => $validated['stock_account_id'],
                        'description' => "Cost of {$stockSymbol} Sold",
                        'debit' => 0,
                        'credit' => $costBasis,
                    ]);
                    
                    // Difference is PnL
                    $pnl = $netAmount - $costBasis;
                    
                    if ($pnl != 0 && $request->filled('pnl_account_id')) {
                        AccountingJournalEntryLine::create([
                            'journal_entry_id' => $entry->id,
                            'account_id' => $validated['pnl_account_id'],
                            'description' => "Gain/Loss on {$stockSymbol}",
                            'debit' => ($pnl < 0) ? abs($pnl) : 0, // Loss = Debit
                            'credit' => ($pnl > 0) ? $pnl : 0,     // Gain = Credit
                        ]);
                    }
                } else {
                    // Fallback: Credit entire amount to Stock Account (Simple reduction)
                     AccountingJournalEntryLine::create([
                        'journal_entry_id' => $entry->id,
                        'account_id' => $validated['stock_account_id'],
                        'description' => "Sale Proceeds {$stockSymbol}",
                        'debit' => 0,
                        'credit' => $netAmount,
                    ]);
                }
            }

            // Link Entry to Transaction
            $stockTx->update(['accounting_journal_entry_id' => $entry->id]);
        });

        return redirect()->route('stocks.index')->with('message', 'Transaction recorded and posted to accounting.');
    }
}
