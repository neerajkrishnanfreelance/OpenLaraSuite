<?php

namespace App\Http\Controllers;

use App\Models\AccountingJournalEntry;
use App\Models\Account;
use App\Models\Journal;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Stats
        $todayStart = now()->startOfDay();
        $monthStart = now()->startOfMonth();

        $stats = [
            'today_count' => AccountingJournalEntry::whereDate('date', now())->count(),
            'today_total' => AccountingJournalEntry::whereDate('date', now())
                ->with('lines')
                ->get()
                ->sum(fn($entry) => $entry->lines->where('credit', '>', 0)->sum('credit')), // Sum credits (payment side) as total
            'month_total' => AccountingJournalEntry::whereDate('date', '>=', $monthStart)
                ->with('lines')
                ->get()
                ->sum(fn($entry) => $entry->lines->where('credit', '>', 0)->sum('credit')),
            'draft_count' => AccountingJournalEntry::where('state', 'draft')->count(),
        ];

        // Entries: "Dash bord consist of today entry"
        // We will show Today's entries by default.
        $entries = AccountingJournalEntry::with(['lines'])
            ->whereDate('date', now())
            ->latest('created_at')
            ->get();

        return Inertia::render('Expenses/Index', [
            'entries' => $entries,
            'stats' => $stats,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $products = Product::where('is_expense', true)->get();
        $journals = Journal::active()->get();
        // Get Asset accounts (Bank/Cash) and Liability accounts (Credit Card/Payable) for "Paid Via"
        $paymentAccounts = Account::whereIn('account_type', ['asset', 'liability', 'equity'])->orderBy('code')->get();
        
        return Inertia::render('Expenses/Create', [
            'products' => $products,
            'journals' => $journals,
            'paymentAccounts' => $paymentAccounts,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'journal_id' => 'required|exists:journals,id',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.amount' => 'required|numeric|min:0.01',
            'items.*.description' => 'nullable|string',
            'payment_account_id' => 'required|exists:accounts,id',
            'reference' => 'nullable|string',
            'description' => 'nullable|string', // Voucher level description
            'action' => 'nullable|string|in:save_draft,save_post',
        ]);

        // 1. Create Journal Entry Header
        $entry = AccountingJournalEntry::create([
            'journal_id' => $validated['journal_id'],
            'reference' => $validated['reference'],
            'date' => $validated['date'],
            'notes' => $validated['description'],
            'created_by' => auth()->id(),
            'state' => 'draft',
        ]);

        $totalAmount = 0;

        // 2. Create Debit Lines (Expenses)
        foreach ($validated['items'] as $item) {
            $product = Product::findOrFail($item['product_id']);
            
            $entry->lines()->create([
                'account_id' => $product->expense_account_id,
                'product_id' => $product->id,
                'description' => $item['description'] ?? $product->name,
                'debit' => $item['amount'],
                'credit' => 0,
            ]);

            $totalAmount += $item['amount'];
        }

        // 3. Create Credit Line (Payment/Payable)
        $entry->lines()->create([
            'account_id' => $validated['payment_account_id'],
            'description' => 'Payment for ' . ($validated['description'] ?? 'Expenses'),
            'debit' => 0,
            'credit' => $totalAmount,
        ]);

        if ($request->input('action') === 'save_post') {
            try {
                $entry->post();
                return redirect()->route('expenses.index')->with('success', 'Expense created and posted successfully.');
            } catch (\Exception $e) {
                return redirect()->route('expenses.index')->with('warning', 'Expense created but failed to post: ' . $e->getMessage());
            }
        }

        return redirect()->route('expenses.create')->with('success', 'Expense recorded successfully. <a href="'.route('accounting.entries.show', $entry).'">View Entry</a>');
    }
    
    public function post(AccountingJournalEntry $entry) {
         try {
            $entry->post();
            return redirect()->back()->with('success', 'Expense posted successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
