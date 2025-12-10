<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        $contacts = Contact::query()
            ->with('assignedUser')
            ->when(request('search'), function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('company', 'like', "%{$search}%");
            })
            ->when(request('status'), function ($query, $status) {
                $query->where('status', $status);
            })
            ->when(request('assigned_to'), function ($query, $id) {
                $query->where('assigned_to', $id);
            })
            ->orderByDesc('created_at')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Contacts/Index', [
            'contacts' => $contacts,
            'filters' => request()->all(['search', 'status', 'assigned_to']),
            'users' => \App\Models\User::role('employee')->select('id', 'name')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Contacts/Create', [
            'users' => \App\Models\User::role('employee')->select('id', 'name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'hourly_rate' => 'nullable|numeric|min:0',
            'company' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'description' => 'nullable|string',
            'status' => 'nullable|in:active,prospect,converted,lost',
            'assigned_to' => 'nullable|exists:users,id',
            'source' => 'nullable|string|max:50',
            'tags' => 'nullable|array',
        ]);

        $validated['created_by'] = auth()->id();
        $validated['status'] = $validated['status'] ?? 'prospect';

        Contact::create($validated);

        return redirect()->route('contacts.index')
            ->with('success', 'Contact created successfully.');
    }

    public function show(Contact $contact)
    {
        $contact->load(['assignedUser', 'creator', 'tasks.leadStage', 'tasks.assignedUser']);

        return Inertia::render('Contacts/Show', [
            'contact' => $contact,
            'users' => \App\Models\User::role('employee')->select('id', 'name')->get(),
        ]);
    }

    public function edit(Contact $contact)
    {
        return Inertia::render('Contacts/Edit', [
            'contact' => $contact,
            'users' => \App\Models\User::role('employee')->select('id', 'name')->get(),
        ]);
    }

    public function update(Request $request, Contact $contact)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'hourly_rate' => 'nullable|numeric|min:0',
            'company' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'description' => 'nullable|string',
            'status' => 'nullable|in:active,prospect,converted,lost',
            'assigned_to' => 'nullable|exists:users,id',
            'source' => 'nullable|string|max:50',
            'tags' => 'nullable|array',
        ]);

        $contact->update($validated);

        return redirect()->route('contacts.index')
            ->with('success', 'Contact updated successfully.');
    }

    public function destroy(Contact $contact)
    {
        $contact->delete();

        return redirect()->route('contacts.index')
            ->with('success', 'Contact deleted successfully.');
    }
}
