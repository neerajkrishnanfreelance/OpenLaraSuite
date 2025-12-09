<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountController extends Controller
{
    public function index()
    {
        $accounts = Account::with('parent')
            ->orderBy('code')
            ->get();

        return Inertia::render('Accounting/Accounts/Index', [
            'accounts' => $accounts,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|unique:accounts',
            'name' => 'required',
            'account_type' => 'required|in:asset,liability,equity,income,expense',
            'parent_id' => 'nullable|exists:accounts,id',
            'description' => 'nullable',
        ]);

        $account = Account::create($validated);

        return redirect()->back()->with('success', 'Account created successfully');
    }

    public function update(Request $request, Account $account)
    {
        $validated = $request->validate([
            'code' => 'required|unique:accounts,code,' . $account->id,
            'name' => 'required',
            'account_type' => 'required|in:asset,liability,equity,income,expense',
            'parent_id' => 'nullable|exists:accounts,id',
            'description' => 'nullable',
            'is_active' => 'boolean',
        ]);

        $account->update($validated);

        return redirect()->back()->with('success', 'Account updated successfully');
    }

    public function destroy(Account $account)
    {
        // Check if account has transactions
        if ($account->journalEntryLines()->count() > 0) {
            return redirect()->back()->with('error', 'Cannot delete account with transactions');
        }

        $account->delete();

        return redirect()->back()->with('success', 'Account deleted successfully');
    }

    public function show(Account $account)
    {
        $account->load(['journalEntryLines.journalEntry.journal']);

        return Inertia::render('Accounting/Accounts/Show', [
            'account' => $account,
            'lines' => $account->journalEntryLines()->with('journalEntry.journal')->latest()->paginate(50),
        ]);
    }
}
