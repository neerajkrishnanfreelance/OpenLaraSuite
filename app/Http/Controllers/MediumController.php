<?php

namespace App\Http\Controllers;

use App\Models\Medium;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MediumController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $media = Medium::orderBy('name')->get();
        return Inertia::render('Media/Index', [
            'media' => $media
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        Medium::create($validated);

        return back()->with('success', 'Media source created successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Medium $medium)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $medium->update($validated);

        return back()->with('success', 'Media source updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Medium $medium)
    {
        $medium->delete();
        return back()->with('success', 'Media source deleted successfully.');
    }
}
