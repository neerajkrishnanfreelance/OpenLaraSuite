<?php

namespace App\Http\Controllers;

use App\Models\Journal;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountingJournalController extends Controller
{
    public function index()
    {
        $journals = Journal::orderBy('code')->get();

        return Inertia::render('Accounting/Journals/Index', [
            'journals' => $journals,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:10|unique:journals',
            'type' => 'required|in:sale,purchase,cash,bank,general',
            'description' => 'nullable|string',
        ]);

        Journal::create($validated);

        return redirect()->back()->with('success', 'Journal created successfully');
    }

    public function update(Request $request, Journal $journal)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:10|unique:journals,code,' . $journal->id,
            'type' => 'required|in:sale,purchase,cash,bank,general',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $journal->update($validated);

        return redirect()->back()->with('success', 'Journal updated successfully');
    }

    public function destroy(Journal $journal)
    {
        if ($journal->journalEntries()->count() > 0) {
            return redirect()->back()->with('error', 'Cannot delete journal with existing entries.');
        }

        $journal->delete();

        return redirect()->back()->with('success', 'Journal deleted successfully');
    }
}
