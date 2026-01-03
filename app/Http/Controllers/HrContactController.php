<?php

namespace App\Http\Controllers;

use App\Models\HrContact;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;
use App\Mail\ResumeAppWelcome;

class HrContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = HrContact::latest();

        if ($request->filled('search')) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%')
                  ->orWhere('company', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        return Inertia::render('HrContacts/Index', [
            'contacts' => $query->get(),
            'filters' => $request->only(['search', 'status'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('HrContacts/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'position' => 'nullable|string|max:255',
            'status' => 'required|string',
        ]);

        HrContact::create($validated);

        return redirect()->route('hr-contacts.index')->with('success', 'Contact created successfully.');
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
    public function edit(HrContact $hrContact)
    {
        return Inertia::render('HrContacts/Edit', [
            'contact' => $hrContact
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HrContact $hrContact)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'position' => 'nullable|string|max:255',
            'status' => 'required|string',
        ]);

        $hrContact->update($validated);

        return redirect()->route('hr-contacts.index')->with('success', 'Contact updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HrContact $hrContact)
    {
        $hrContact->delete();
        return redirect()->route('hr-contacts.index')->with('success', 'Contact deleted successfully.');
    }

    /**
     * Send welcome email to the contact.
     */
    public function sendWelcome(HrContact $hrContact)
    {
        if (!$hrContact->email) {
            return back()->with('error', 'Contact has no email address.');
        }

        Mail::to($hrContact->email)->send(new ResumeAppWelcome($hrContact));
        
        $hrContact->update(['status' => 'Contacted']);

        return back()->with('success', 'Welcome email sent successfully.');
    }
    /**
     * Remove the specified resources from storage.
     */
    public function bulkDelete(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:hr_contacts,id',
        ]);

        HrContact::whereIn('id', $request->ids)->delete();

        return redirect()->route('hr-contacts.index')->with('success', 'Selected contacts deleted successfully.');
    }
}
