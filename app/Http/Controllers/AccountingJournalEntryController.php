<?php

namespace App\Http\Controllers;

use App\Models\AccountingJournalEntry;
use App\Models\Journal;
use App\Models\Account;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountingJournalEntryController extends Controller
{
    public function index(Request $request)
    {
        $query = AccountingJournalEntry::with(['journal', 'createdBy']);

        if ($request->journal_id) {
            $query->where('journal_id', $request->journal_id);
        }

        if ($request->state) {
            $query->where('state', $request->state);
        }

        if ($request->start_date && $request->end_date) {
            $query->whereBetween('date', [$request->start_date, $request->end_date]);
        }

        $entries = $query->latest('date')->paginate(20);
        $journals = Journal::active()->get();

        return Inertia::render('Accounting/Entries/Index', [
            'entries' => $entries,
            'journals' => $journals,
            'filters' => $request->only(['journal_id', 'state', 'start_date', 'end_date']),
        ]);
    }

    public function create()
    {
        $journals = Journal::active()->get();
        $accounts = Account::active()->orderBy('code')->get();

        return Inertia::render('Accounting/Entries/Create', [
            'journals' => $journals,
            'accounts' => $accounts,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'journal_id' => 'required|exists:journals,id',
            'reference' => 'nullable|string',
            'date' => 'required|date',
            'notes' => 'nullable|string',
            'lines' => 'required|array|min:2',
            'lines.*.account_id' => 'required|exists:accounts,id',
            'lines.*.description' => 'required|string',
            'lines.*.debit' => 'required|numeric|min:0',
            'lines.*.credit' => 'required|numeric|min:0',
        ]);

        $entry = AccountingJournalEntry::create([
            'journal_id' => $validated['journal_id'],
            'reference' => $validated['reference'],
            'date' => $validated['date'],
            'notes' => $validated['notes'],
            'created_by' => auth()->id(),
            'state' => 'draft',
        ]);

        foreach ($validated['lines'] as $line) {
            $entry->lines()->create($line);
        }

        return redirect()->route('accounting.entries.show', $entry)->with('success', 'Journal entry created successfully');
    }

    public function show(AccountingJournalEntry $entry)
    {
        $entry->load(['journal', 'lines.account', 'createdBy', 'postedBy']);

        return Inertia::render('Accounting/Entries/Show', [
            'entry' => $entry,
        ]);
    }

    public function post(AccountingJournalEntry $entry)
    {
        try {
            $entry->post();
            return redirect()->back()->with('success', 'Journal entry posted successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function edit(AccountingJournalEntry $entry)
    {
        if ($entry->state !== 'draft') {
            return redirect()->back()->with('error', 'Only draft entries can be edited.');
        }

        $entry->load(['lines']);
        $journals = Journal::active()->get();
        $accounts = Account::active()->orderBy('code')->get();

        return Inertia::render('Accounting/Entries/Edit', [
            'entry' => $entry,
            'journals' => $journals,
            'accounts' => $accounts,
        ]);
    }

    public function update(Request $request, AccountingJournalEntry $entry)
    {
        if ($entry->state !== 'draft') {
            return redirect()->back()->with('error', 'Only draft entries can be edited.');
        }

        $validated = $request->validate([
            'journal_id' => 'required|exists:journals,id',
            'reference' => 'nullable|string',
            'date' => 'required|date',
            'notes' => 'nullable|string',
            'lines' => 'required|array|min:2',
            'lines.*.account_id' => 'required|exists:accounts,id',
            'lines.*.description' => 'required|string',
            'lines.*.debit' => 'required|numeric|min:0',
            'lines.*.credit' => 'required|numeric|min:0',
        ]);

        $entry->update([
            'journal_id' => $validated['journal_id'],
            'reference' => $validated['reference'],
            'date' => $validated['date'],
            'notes' => $validated['notes'],
        ]);

        // Replace lines
        $entry->lines()->delete();
        foreach ($validated['lines'] as $line) {
            $entry->lines()->create($line);
        }

        return redirect()->route('accounting.entries.show', $entry)->with('success', 'Journal entry updated successfully');
    }

    public function cancel(AccountingJournalEntry $entry)
    {
        if ($entry->state === 'posted') {
            return redirect()->back()->with('error', 'Cannot cancel posted entry. You must create a reversing entry.');
        }

        $entry->update(['state' => 'cancelled']);

        return redirect()->back()->with('success', 'Journal entry cancelled successfully');
    }

    public function destroy(AccountingJournalEntry $entry)
    {
        if ($entry->state === 'posted') {
            return redirect()->back()->with('error', 'Cannot delete posted entry');
        }

        $entry->delete();

        return redirect()->route('accounting.entries.index')->with('success', 'Journal entry deleted successfully');
    }
}
