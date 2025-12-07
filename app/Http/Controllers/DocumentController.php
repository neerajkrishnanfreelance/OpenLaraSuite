<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class DocumentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'files' => 'required|array',
            'files.*' => 'file|max:10240', // 10MB max
            'documentable_id' => 'required|integer',
            'documentable_type' => 'required|string',
        ]);

        $documents = [];

        foreach ($request->file('files') as $file) {
            $path = $file->store('documents', 'public');

            $document = Document::create([
                'name' => $file->getClientOriginalName(),
                'path' => $path,
                'mime_type' => $file->getMimeType(),
                'size' => $file->getSize(),
                'documentable_id' => $request->documentable_id,
                'documentable_type' => $request->documentable_type,
            ]);

            $documents[] = $document;
        }

        return redirect()->back()->with('message', 'Documents uploaded successfully.');
    }

    public function destroy(Document $document)
    {
        Storage::disk('public')->delete($document->path);
        $document->delete();

        return redirect()->back()->with('message', 'Document deleted.');
    }
}
