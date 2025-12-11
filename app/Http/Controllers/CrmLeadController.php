<?php

namespace App\Http\Controllers;

use App\Models\CrmLead;
use App\Models\Contact;
use App\Models\LeadStage;
use App\Models\Medium;
use App\Models\User;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CrmLeadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = CrmLead::with(['contact', 'leadStage', 'assignedUser', 'creator', 'medium']);

        // Filters
        if ($request->filled('assigned_to')) {
            $query->where('assigned_to', $request->assigned_to);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('lead_stage_id')) {
            $query->where('lead_stage_id', $request->lead_stage_id);
        }

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->search}%")
                    ->orWhere('contact_name', 'like', "%{$request->search}%")
                    ->orWhere('company', 'like', "%{$request->search}%");
            });
        }

        $leads = $query->latest()->get();

        return Inertia::render('CRM/Leads', [
            'leads' => $leads,
            'lead_stages' => LeadStage::orderBy('order')->get(),
            'users' => User::role('employee')->select('id', 'name')->get(),
            'filters' => $request->only(['assigned_to', 'status', 'lead_stage_id', 'search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('CRM/CreateLead', [
            'contacts' => Contact::select('id', 'name')->get(),
            'lead_stages' => LeadStage::orderBy('order')->get(),
            'media' => Medium::orderBy('name')->get(),
            'users' => User::role('employee')->select('id', 'name')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'contact_id' => 'nullable|exists:contacts,id',
            'contact_name' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'lead_stage_id' => 'nullable|exists:lead_stages,id',
            'expected_revenue' => 'nullable|numeric|min:0',
            'source' => 'nullable|string|max:255',
            'medium_id' => 'nullable|exists:media,id',
            'priority' => 'required|in:low,medium,high',
            'status' => 'required|in:new,contacted,qualified,proposal,negotiation,won,lost',
            'assigned_to' => 'nullable|exists:users,id',
            'expected_close_date' => 'nullable|date',
            'tags' => 'nullable|array',
            'notes' => 'nullable|string',
        ]);

        $validated['created_by'] = Auth::id();

        CrmLead::create($validated);

        return redirect()->route('crm.leads')->with('success', 'Lead created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(CrmLead $lead)
    {
        $lead->load(['contact', 'leadStage', 'assignedUser', 'creator', 'medium', 'activities', 'chatterMessages.user', 'documents']);

        return Inertia::render('CRM/ShowLead', [
            'lead' => $lead,
            'contacts' => Contact::select('id', 'name')->get(),
            'lead_stages' => LeadStage::orderBy('order')->get(),
            'media' => Medium::orderBy('name')->get(),
            'users' => User::role('employee')->select('id', 'name')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CrmLead $lead)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'contact_id' => 'nullable|exists:contacts,id',
            'contact_name' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'lead_stage_id' => 'nullable|exists:lead_stages,id',
            'expected_revenue' => 'nullable|numeric|min:0',
            'source' => 'nullable|string|max:255',
            'medium_id' => 'nullable|exists:media,id',
            'priority' => 'required|in:low,medium,high',
            'status' => 'required|in:new,contacted,qualified,proposal,negotiation,won,lost',
            'assigned_to' => 'nullable|exists:users,id',
            'expected_close_date' => 'nullable|date',
            'tags' => 'nullable|array',
            'notes' => 'nullable|string',
        ]);

        $lead->update($validated);

        return back()->with('success', 'Lead updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CrmLead $lead)
    {
        $lead->delete();

        return redirect()->route('crm.leads')->with('success', 'Lead deleted successfully.');
    }

    /**
     * Convert lead to project
     */
    public function convertToProject(CrmLead $lead)
    {
        $project = DB::transaction(function () use ($lead) {
            $project = Project::create([
                'name' => $lead->title,
                'description' => $lead->description . "\n\nConverted from Lead: " . $lead->id,
                'status' => 'planning',
                'start_date' => now(),
            ]);

            // Mark lead as won
            $lead->update([
                'status' => 'won',
            ]);

            return $project;
        });

        return redirect()->route('projects.show', $project)
            ->with('success', 'Project created from lead successfully!');
    }
}
