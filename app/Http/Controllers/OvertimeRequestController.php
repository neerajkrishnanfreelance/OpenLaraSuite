<?php

namespace App\Http\Controllers;

use App\Models\OvertimeRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OvertimeRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $query = OvertimeRequest::with(['user', 'approver']);

        // Employees only see their own requests
        if (!$user->hasAnyRole(['admin', 'manager'])) {
            $query->where('user_id', $user->id);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $requests = $query->latest('date')->paginate(10)->withQueryString();

        return Inertia::render('Overtime/Index', [
            'requests' => $requests,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Overtime/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'start_time' => 'required', // Time format validation handled by frontend usually
            'end_time' => 'required',
            'reason' => 'required|string',
        ]);

        $validated['user_id'] = Auth::id();
        $validated['status'] = 'pending';

        OvertimeRequest::create($validated);

        return redirect()->route('overtime-requests.index')->with('message', 'Overtime requested successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(OvertimeRequest $overtimeRequest)
    {
        $overtimeRequest->load(['chatterMessages.user', 'chatterMessages.documents', 'relatedMeetings.organizer', 'documents']);

        // Check policy/authorization (simplified for now, matches destroy logic)
        if (Auth::user()->id !== $overtimeRequest->user_id && !Auth::user()->hasAnyRole(['admin', 'manager'])) {
             abort(403);
        }

        return Inertia::render('Overtime/Edit', [
            'request' => $overtimeRequest,
            'chatter_data' => $overtimeRequest->chatterMessages,
            'meetings_data' => $overtimeRequest->relatedMeetings,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, OvertimeRequest $overtimeRequest)
    {
        $user = Auth::user();

        // Approval logic
        if ($user->hasAnyRole(['admin', 'manager']) && $request->has('status')) {
            $validated = $request->validate([
                'status' => 'required|in:approved,rejected',
            ]);
            
            $overtimeRequest->update([
                'status' => $validated['status'],
                'approver_id' => $user->id,
            ]);

            return redirect()->back()->with('message', 'Request status updated.');
        }

        return redirect()->back()->with('error', 'Unauthorized action.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OvertimeRequest $overtimeRequest)
    {
        if (Auth::user()->id !== $overtimeRequest->user_id && !Auth::user()->hasAnyRole(['admin', 'manager'])) {
             abort(403);
        }
        
        $overtimeRequest->delete();

        return redirect()->route('overtime-requests.index')->with('message', 'Request deleted.');
    }
}
