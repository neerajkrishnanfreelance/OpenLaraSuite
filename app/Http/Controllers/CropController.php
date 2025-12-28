<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Crop;
use Inertia\Inertia;

class CropController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $crops = Crop::orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('Agriculture/Crops/Index', ['crops' => $crops]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Agriculture/Crops/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'nullable|string',
            'variety' => 'nullable|string',
            'planting_date' => 'nullable|date',
            'harvest_date' => 'nullable|date',
            'status' => 'required|in:active,harvested,failed',
            'check_r_n_d' => 'boolean',
            'notes' => 'nullable|string',
        ]);

        Crop::create($validated);
        return redirect()->route('agriculture.crops.index')->with('success', 'Crop created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Crop $crop)
    {
        $crop->load(['logs' => function ($query) {
            $query->orderBy('log_date', 'desc');
        }, 'schedules' => function ($query) {
            $query->orderBy('scheduled_date', 'asc');
        }]);
        return Inertia::render('Agriculture/Crops/Show', ['crop' => $crop]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Crop $crop)
    {
        return Inertia::render('Agriculture/Crops/Edit', ['crop' => $crop]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Crop $crop)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'nullable|string',
            'variety' => 'nullable|string',
            'planting_date' => 'nullable|date',
            'harvest_date' => 'nullable|date',
            'status' => 'required|in:active,harvested,failed',
            'check_r_n_d' => 'boolean',
            'notes' => 'nullable|string',
        ]);

        $crop->update($validated);
        return redirect()->route('agriculture.crops.index')->with('success', 'Crop updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Crop $crop)
    {
        $crop->delete();
        return redirect()->route('agriculture.crops.index')->with('success', 'Crop deleted.');
    }
}
