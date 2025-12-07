<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ChatterMessage;
use Illuminate\Support\Facades\Auth;

class ChatterController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'message' => 'required|string',
            'chatterable_id' => 'required|integer',
            'chatterable_type' => 'required|string',
            'notify_email' => 'boolean',
            'documents.*' => 'nullable|file|max:10240', // 10MB max
        ]);

        $message = ChatterMessage::create([
            'user_id' => Auth::id(),
            'message' => $validated['message'],
            'chatterable_id' => $validated['chatterable_id'],
            'chatterable_type' => $validated['chatterable_type'],
        ]);

        if ($request->hasFile('documents')) {
            foreach ($request->file('documents') as $file) {
                $path = $file->store('documents', 'public');
                $message->documents()->create([
                    'name' => $file->getClientOriginalName(),
                    'path' => $path,
                    'mime_type' => $file->getMimeType(),
                    'size' => $file->getSize(),
                ]);
            }
        }

        // Logic for email notification would go here
        
        return back();
    }
}
