<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LeadStage;
use Inertia\Inertia;

class LeadStageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $stages = LeadStage::orderBy('order')->get();
        return Inertia::render('Settings/LeadStages', [
            'stages' => $stages
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Usually handled dynamically in settings page
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'color' => 'nullable|string|max:50',
            'order' => 'integer'
        ]);

        LeadStage::create($validated);

        return back()->with('success', 'Stage created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(LeadStage $leadStage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LeadStage $leadStage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LeadStage $leadStage)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'color' => 'nullable|string|max:50',
            'order' => 'integer'
        ]);

        $leadStage->update($validated);

        return back()->with('success', 'Stage updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LeadStage $leadStage)
    {
        $leadStage->delete();
        return back()->with('success', 'Stage deleted.');
    }
}
