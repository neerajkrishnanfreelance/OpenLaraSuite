<?php

namespace App\Http\Controllers;

use App\Models\JournalEntry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class JournalController extends Controller
{
    public function index()
    {
        $entries = JournalEntry::where('user_id', Auth::id())
            ->orderBy('date', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return Inertia::render('Journal/Index', [
            'entries' => $entries,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string',
            'date' => 'required|date',
            'mood' => 'nullable|string',
            'improvement_list' => 'nullable|string',
        ]);

        JournalEntry::create([
            'user_id' => Auth::id(),
            'date' => $request->date,
            'content' => $request->content,
            'mood' => $request->mood,
            'improvement_list' => $request->improvement_list,
        ]);

        return redirect()->back()->with('message', 'Entry saved successfully.');
    }

    public function update(Request $request, JournalEntry $journal)
    {
        if ($journal->user_id !== Auth::id()) {
            abort(403);
        }

        $request->validate([
            'content' => 'required|string',
            'mood' => 'nullable|string',
            'improvement_list' => 'nullable|string',
        ]);

        $journal->update([
            'content' => $request->content,
            'mood' => $request->mood,
            'improvement_list' => $request->improvement_list,
        ]);

        return redirect()->back()->with('message', 'Entry updated successfully.');
    }

    public function destroy(JournalEntry $journal)
    {
        if ($journal->user_id !== Auth::id()) {
            abort(403);
        }

        $journal->delete();

        return redirect()->back();
    }
}
