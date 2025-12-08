<?php

namespace App\Http\Controllers;

use App\Exports\RequirementsExport;
use App\Imports\RequirementsImport;
use App\Models\Project;
use App\Models\Requirement;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class RequirementController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:Low,Medium,High',
            'status' => 'required|in:Pending,In Progress,Completed',
        ]);

        Requirement::create($validated);

        return back()->with('message', 'Requirement added successfully.');
    }

    public function update(Request $request, Requirement $requirement)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:Low,Medium,High',
            'status' => 'required|in:Pending,In Progress,Completed',
        ]);

        $requirement->update($validated);

        return back()->with('message', 'Requirement updated successfully.');
    }

    public function destroy(Requirement $requirement)
    {
        $requirement->delete();
        return back()->with('message', 'Requirement deleted successfully.');
    }

    public function export(Project $project)
    {
        return Excel::download(new RequirementsExport($project->id), 'requirements.xlsx');
    }

    public function import(Request $request, Project $project)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,csv',
        ]);

        Excel::import(new RequirementsImport($project->id), $request->file('file'));

        return back()->with('message', 'Requirements imported successfully.');
    }
}
