<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\AccountingJournalEntry;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountingDashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_accounts' => Account::count(),
            'total_entries' => AccountingJournalEntry::count(),
            'draft_entries' => AccountingJournalEntry::draft()->count(),
            'posted_entries' => AccountingJournalEntry::posted()->count(),
            'total_assets' => Account::assets()->sum('balance'),
            'total_liabilities' => Account::liabilities()->sum('balance'),
            'total_equity' => Account::equity()->sum('balance'),
        ];

        $recent_entries = AccountingJournalEntry::with(['journal', 'createdBy'])
            ->latest()
            ->take(10)
            ->get();

        return Inertia::render('Accounting/Dashboard', [
            'stats' => $stats,
            'recent_entries' => $recent_entries,
        ]);
    }
}
