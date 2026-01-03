<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Barryvdh\DomPDF\Facade\Pdf;
use Inertia\Inertia;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notes = auth()->user()->notes()->with(['recordings', 'attachments', 'project', 'task'])->latest()->get();
        return Inertia::render('Notes/Index', [
            'notes' => $notes
        ]);
    }

    public function create(Request $request)
    {
        // Load projects with tasks for selection
        $projects = auth()->user()->projects()->with('tasks')->get();
        // Also fetch loose tasks assigned to user if needed, but for now just project tasks is fine
        // Or all tasks assigned to user? User might want to link a standalone task?
        // Let's stick to Project -> Task hierarchy for now as it's cleaner.
        
        return Inertia::render('Notes/Edit', [
            'projects' => $projects,
            'preselected_project_id' => $request->query('project_id')
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'drawing_data' => 'nullable|string',
            'spreadsheet_data' => 'nullable|string',
            'document_data' => 'nullable|string',
            'project_id' => 'nullable|exists:projects,id',
            'task_id' => 'nullable|exists:tasks,id',
        ]);

        $request->user()->notes()->create($validated);

        return redirect()->route('notes.index')->with('success', 'Note created successfully.');
    }

    public function show(Note $note)
    {
        if ($note->user_id !== auth()->id()) {
            abort(403);
        }
        
        $note->load(['recordings', 'attachments', 'project', 'task']);

        return Inertia::render('Notes/Show', [
            'note' => $note
        ]);
    }

    public function edit(Note $note)
    {
        if ($note->user_id !== auth()->id()) {
            abort(403);
        }

        $note->load(['recordings', 'attachments']);
        $projects = auth()->user()->projects()->with('tasks')->get();

        return Inertia::render('Notes/Edit', [
            'note' => $note,
            'projects' => $projects
        ]);
    }

    public function update(Request $request, Note $note)
    {
        if ($note->user_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'drawing_data' => 'nullable|string',
            'spreadsheet_data' => 'nullable|string',
            'document_data' => 'nullable|string',
            'project_id' => 'nullable|exists:projects,id',
            'task_id' => 'nullable|exists:tasks,id',
        ]);

        $note->update($validated);

        return redirect()->route('notes.index')->with('success', 'Note updated successfully.');
    }

    public function destroy(Note $note)
    {
        if ($note->user_id !== auth()->id()) {
            abort(403);
        }
        
        $note->delete();
        return redirect()->route('notes.index')->with('success', 'Note deleted successfully.');
    }

    public function downloadPdf(Request $request, Note $note)
    {
        if ($note->user_id !== auth()->id()) {
            abort(403);
        }

        $data = $request->validate([
            'images' => 'nullable|array',
            'images.*' => 'string', // Ensure strings (base64)
        ]);
        
        $images = $data['images'] ?? [];

        // Eager load relations if not already loaded (though we are in a new request so they won't be)
        $note->load(['project', 'task', 'attachments']);

        $pdf = Pdf::loadView('pdf.note', [
            'note' => $note,
            'images' => $images
        ])->setPaper([0, 0, 800, 600], 'landscape'); // Match canvas size: 800x600px (4:3 aspect ratio)

        return $pdf->download('note-' . $note->id . '.pdf');
    }

    public function printPreview(Request $request, Note $note)
    {
        if ($note->user_id !== auth()->id()) {
            abort(403);
        }

        $data = $request->validate([
            'images' => 'nullable|array',
            'images.*' => 'string', // Base64 encoded images
        ]);
        
        $images = $data['images'] ?? [];

        // Load relations for metadata display
        $note->load(['project', 'task']);

        return view('notes.print-preview', [
            'note' => $note,
            'images' => $images
        ]);
    }
}
