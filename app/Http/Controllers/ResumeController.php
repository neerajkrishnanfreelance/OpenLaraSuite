<?php

namespace App\Http\Controllers;

use App\Models\Resume;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ResumeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $resumes = Resume::where('user_id', Auth::id())->latest()->get();
        return Inertia::render('Resumes/Index', [
            'resumes' => $resumes
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // We can jump straight to builder with a new ID or just a simple create form then redirect to builder.
        // Let's do simple create form first for title/summary.
        return Inertia::render('Resumes/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'summary' => 'nullable|string',
        ]);

        $resume = Auth::user()->resumes()->create([
            'title' => $validated['title'],
            'summary' => $validated['summary'],
            'content' => [], // Initialize empty
        ]);

        return redirect()->route('resumes.edit', $resume->id)->with('success', 'Resume created. Start building!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Resume $resume)
    {
        if ($resume->user_id !== Auth::id()) {
            abort(403);
        }
        return Inertia::render('Resumes/View', [
            'resume' => $resume
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Resume $resume)
    {
        if ($resume->user_id !== Auth::id()) {
            abort(403);
        }
        return Inertia::render('Resumes/Builder', [
            'resume' => $resume
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Resume $resume)
    {
        if ($resume->user_id !== Auth::id()) {
            abort(403);
        }
        
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'summary' => 'nullable|string',
            'content' => 'nullable|array',
        ]);

        $resume->update($validated);

        return back()->with('success', 'Resume saved successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Resume $resume)
    {
        if ($resume->user_id !== Auth::id()) {
            abort(403);
        }
        $resume->delete();
        return redirect()->route('resumes.index')->with('success', 'Resume deleted successfully.');
    }
}
