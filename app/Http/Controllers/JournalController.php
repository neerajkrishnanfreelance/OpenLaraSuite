<?php

namespace App\Http\Controllers;

use App\Models\JournalEntry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class JournalController extends Controller
{
    public function index(Request $request)
    {
        $view = $request->input('view', 'list'); // 'list' or 'kanban'
        $categories = \App\Models\JournalCategory::where('user_id', Auth::id())->get();

        $entriesQuery = JournalEntry::where('user_id', Auth::id())
            ->with('category');

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->input('search');
            $entriesQuery->where(function($q) use ($search) {
                $q->where('title', 'like', '%' . $search . '%')
                  ->orWhere('content', 'like', '%' . $search . '%');
            });
        }

        // Category filter
        if ($request->filled('category')) {
            $entriesQuery->where('journal_category_id', $request->input('category'));
        }

        // Mood filter
        if ($request->filled('mood')) {
            $entriesQuery->where('mood', $request->input('mood'));
        }

        // Date range filter
        if ($request->filled('date_from')) {
            $entriesQuery->where('date', '>=', $request->input('date_from'));
        }
        if ($request->filled('date_to')) {
            $entriesQuery->where('date', '<=', $request->input('date_to'));
        }

        $entriesQuery->orderBy('date', 'desc')
            ->orderBy('created_at', 'desc');

        if ($view === 'kanban') {
            // For Kanban, we might want all recent entries, or grouped by category on frontend
            // Let's return all recent ones (e.g. last 30 days) for board
            $entries = $entriesQuery->get();
        } else {
            $entries = $entriesQuery->paginate(20)->withQueryString();
        }

        return Inertia::render('Journal/Index', [
            'entries' => $entries,
            'categories' => $categories,
            'view' => $view,
            'filters' => [
                'search' => $request->input('search', ''),
                'category' => $request->input('category', ''),
                'mood' => $request->input('mood', ''),
                'date_from' => $request->input('date_from', ''),
                'date_to' => $request->input('date_to', ''),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string',
            'date' => 'required|date',
            'title' => 'nullable|string',
            'mood' => 'nullable|string',
            'journal_category_id' => 'nullable|exists:journal_categories,id',
            'improvement_list' => 'nullable|string',
        ]);

        JournalEntry::create([
            'user_id' => Auth::id(),
            'date' => $request->date,
            'title' => $request->title,
            'content' => $request->content,
            'mood' => $request->mood,
            'journal_category_id' => $request->journal_category_id,
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
            'title' => 'nullable|string',
            'mood' => 'nullable|string',
            'journal_category_id' => 'nullable|exists:journal_categories,id',
            'improvement_list' => 'nullable|string',
        ]);

        $journal->update([
            'content' => $request->content,
            'title' => $request->title,
            'mood' => $request->mood,
            'journal_category_id' => $request->journal_category_id,
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
    
    // Masters management
    public function storeCategory(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'color' => 'nullable|string',
        ]);

        \App\Models\JournalCategory::create([
            'user_id' => Auth::id(),
            'name' => $request->name,
            'color' => $request->color ?? 'bg-gray-100 text-gray-800',
        ]);

        return redirect()->back()->with('message', 'Category created.');
    }

    public function destroyCategory(\App\Models\JournalCategory $category)
    {
        if ($category->user_id !== Auth::id()) { abort(403); }
        $category->delete();
        return redirect()->back();
    }
}
