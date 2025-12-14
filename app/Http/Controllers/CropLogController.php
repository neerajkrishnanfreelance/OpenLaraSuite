<?php

namespace App\Http\Controllers;

use App\Models\CropLog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class CropLogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $logs = CropLog::with('crop')->orderBy('log_date', 'desc')->orderBy('created_at', 'desc')->paginate(20);
        return Inertia::render('Agriculture/Logs/Index', ['logs' => $logs]);
    }

    public function create()
    {
        // Not used, modal on show page
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'crop_id' => 'required|exists:crops,id',
            'log_date' => 'required|date',
            'log_type' => 'required|string|in:observation,nutrition,pesticide,water,harvest',
            'stage' => 'nullable|string',
            'notes' => 'nullable|string',
            'image' => 'nullable|image|max:10240', // Max 10MB
            'temperature' => 'nullable|numeric',
            'humidity' => 'nullable|numeric',
            'input_name' => 'nullable|string',
            'input_quantity' => 'nullable|numeric',
            'input_unit' => 'nullable|string',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('crop_logs', 'public');
        }

        CropLog::create([
            'crop_id' => $validated['crop_id'],
            'log_date' => $validated['log_date'],
            'log_type' => $validated['log_type'],
            'stage' => $validated['stage'],
            'notes' => $validated['notes'],
            'image_path' => $imagePath,
            'temperature' => $validated['temperature'],
            'humidity' => $validated['humidity'],
            'input_name' => $validated['input_name'] ?? null,
            'input_quantity' => $validated['input_quantity'] ?? null,
            'input_unit' => $validated['input_unit'] ?? null,
        ]);

        return back()->with('success', 'Log added successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
