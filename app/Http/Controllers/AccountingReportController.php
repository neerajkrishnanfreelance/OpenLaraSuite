<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\AccountingJournalEntry;
use App\Models\Journal;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountingReportController extends Controller
{
    public function balanceSheet(Request $request)
    {
        $date = $request->date ?? now()->format('Y-m-d');

        $assets = Account::assets()->active()->with('children')->whereNull('parent_id')->get();
        $liabilities = Account::liabilities()->active()->with('children')->whereNull('parent_id')->get();
        $equity = Account::equity()->active()->with('children')->whereNull('parent_id')->get();

        $totalAssets = Account::assets()->sum('balance');
        $totalLiabilities = Account::liabilities()->sum('balance');
        $totalEquity = Account::equity()->sum('balance');

        return Inertia::render('Accounting/Reports/BalanceSheet', [
            'assets' => $assets,
            'liabilities' => $liabilities,
            'equity' => $equity,
            'totalAssets' => $totalAssets,
            'totalLiabilities' => $totalLiabilities,
            'totalEquity' => $totalEquity,
            'date' => $date,
        ]);
    }

    public function profitLoss(Request $request)
    {
        $startDate = $request->start_date ?? now()->startOfMonth()->format('Y-m-d');
        $endDate = $request->end_date ?? now()->endOfMonth()->format('Y-m-d');

        $income = Account::income()->active()->with('children')->whereNull('parent_id')->get();
        $expenses = Account::expenses()->active()->with('children')->whereNull('parent_id')->get();

        $totalIncome = Account::income()->sum('balance');
        $totalExpenses = Account::expenses()->sum('balance');
        $netProfit = $totalIncome - $totalExpenses;

        return Inertia::render('Accounting/Reports/ProfitLoss', [
            'income' => $income,
            'expenses' => $expenses,
            'totalIncome' => $totalIncome,
            'totalExpenses' => $totalExpenses,
            'netProfit' => $netProfit,
            'startDate' => $startDate,
            'endDate' => $endDate,
        ]);
    }

    public function generalLedger(Request $request)
    {
        $accountId = $request->account_id;
        $startDate = $request->start_date ?? now()->startOfMonth()->format('Y-m-d');
        $endDate = $request->end_date ?? now()->endOfMonth()->format('Y-m-d');

        $accounts = Account::active()->orderBy('code')->get();
        $selectedAccount = $accountId ? Account::find($accountId) : null;

        $lines = null;
        if ($selectedAccount) {
            $lines = $selectedAccount->journalEntryLines()
                ->with('journalEntry.journal')
                ->whereHas('journalEntry', function ($q) use ($startDate, $endDate) {
                    $q->where('state', 'posted')
                      ->whereBetween('date', [$startDate, $endDate]);
                })
                ->orderBy('created_at')
                ->get();
        }

        return Inertia::render('Accounting/Reports/GeneralLedger', [
            'accounts' => $accounts,
            'selectedAccount' => $selectedAccount,
            'lines' => $lines,
            'startDate' => $startDate,
            'endDate' => $endDate,
        ]);
    }

    public function trialBalance(Request $request)
    {
        $date = $request->date ?? now()->format('Y-m-d');

        $accounts = Account::active()
            ->orderBy('code')
            ->get()
            ->map(function ($account) {
                return [
                    'id' => $account->id,
                    'code' => $account->code,
                    'name' => $account->name,
                    'account_type' => $account->account_type,
                    'debit' => $account->balance > 0 && in_array($account->account_type, ['asset', 'expense']) ? $account->balance : 0,
                    'credit' => $account->balance > 0 && in_array($account->account_type, ['liability', 'equity', 'income']) ? $account->balance : 0,
                ];
            });

        $totalDebit = $accounts->sum('debit');
        $totalCredit = $accounts->sum('credit');

        return Inertia::render('Accounting/Reports/TrialBalance', [
            'accounts' => $accounts,
            'totalDebit' => $totalDebit,
            'totalCredit' => $totalCredit,
            'date' => $date,
        ]);
    }

    public function journalLedger(Request $request)
    {
        $journalId = $request->journal_id;
        $startDate = $request->start_date ?? now()->startOfMonth()->format('Y-m-d');
        $endDate = $request->end_date ?? now()->endOfMonth()->format('Y-m-d');

        $journals = Journal::active()->get();
        $selectedJournal = $journalId ? Journal::find($journalId) : null;

        $entries = null;
        if ($selectedJournal) {
            $entries = AccountingJournalEntry::where('journal_id', $selectedJournal->id)
                ->whereBetween('date', [$startDate, $endDate])
                ->with(['lines.account', 'postedBy'])
                ->orderBy('date')
                ->get();
        } else {
            if ($request->has('journal_id')) {
                 $entries = AccountingJournalEntry::whereBetween('date', [$startDate, $endDate])
                    ->with(['journal', 'lines.account', 'postedBy'])
                    ->orderBy('date')
                    ->get()
                    ->groupBy('journal_id');
            }
        }

        return Inertia::render('Accounting/Reports/JournalLedger', [
            'journals' => $journals,
            'selectedJournal' => $selectedJournal,
            'entries' => $entries,
            'startDate' => $startDate,
            'endDate' => $endDate,
        ]);
    }
}
