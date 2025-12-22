<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Note;
use App\Models\NoteAttachment;
use Illuminate\Support\Facades\Storage;

class NoteAttachmentController extends Controller
{
    public function store(Request $request, Note $note)
    {
        $request->validate([
            'type' => 'required|in:file,youtube',
            'file' => 'required_if:type,file|file|max:20480', // 20MB max
            'youtube_url' => 'required_if:type,youtube|url',
            'label_name' => 'nullable|string'
        ]);

        if ($request->type === 'file') {
            $file = $request->file('file');
            $path = $file->store('note-attachments', 'public');
            
            $attachment = $note->attachments()->create([
                'type' => 'file',
                'name' => $file->getClientOriginalName(),
                'file_path' => $path,
                'mime_type' => $file->getMimeType(),
            ]);

            return response()->json($attachment);

        } elseif ($request->type === 'youtube') {
            // Extract or use provided name
            $name = $request->input('label_name') ?: 'YouTube Video';
            
            $attachment = $note->attachments()->create([
                'type' => 'youtube',
                'name' => $name,
                'url' => $request->input('youtube_url'),
            ]);

             return response()->json($attachment);
        }

        return response()->json(['error' => 'Invalid Request'], 400);
    }

    public function destroy(NoteAttachment $attachment)
    {
        if ($attachment->type === 'file' && $attachment->file_path) {
            if (Storage::disk('public')->exists($attachment->file_path)) {
                Storage::disk('public')->delete($attachment->file_path);
            }
        }

        $attachment->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
