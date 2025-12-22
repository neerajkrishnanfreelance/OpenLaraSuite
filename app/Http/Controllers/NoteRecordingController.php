<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Note;
use App\Models\NoteRecording;

use Illuminate\Support\Facades\Storage;

class NoteRecordingController extends Controller
{
    public function store(Request $request, Note $note)
    {
        $request->validate([
            'audio' => 'required|file|mimes:webm,mp3,wav|max:10240', // 10MB max
            'duration' => 'nullable|integer'
        ]);

        if ($request->hasFile('audio')) {
            $path = $request->file('audio')->store('note-recordings', 'public');

            $recording = $note->recordings()->create([
                'file_path' => $path,
                'duration' => $request->input('duration'),
            ]);

            return response()->json($recording);
        }

        return response()->json(['error' => 'No audio file provided'], 400);
    }

    public function destroy(NoteRecording $recording)
    {
        // Delete file from storage
        if (Storage::disk('public')->exists($recording->file_path)) {
            Storage::disk('public')->delete($recording->file_path);
        }

        $recording->delete();

        return response()->json(['message' => 'Recording deleted']);
    }
}
