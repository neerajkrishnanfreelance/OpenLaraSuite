<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EmailTestController extends Controller
{
    public function show()
    {
        return \Inertia\Inertia::render('Settings/SendEmail');
    }

    public function send(Request $request)
    {
        $validated = $request->validate([
            'to' => 'required|email',
            'subject' => 'required|string|max:255',
            'body' => 'required|string',
        ]);

        try {
            \Illuminate\Support\Facades\Mail::raw($validated['body'], function ($message) use ($validated) {
                $message->to($validated['to'])
                        ->subject($validated['subject']);
            });

            return back()->with('success', 'Email sent successfully.');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to send email: ' . $e->getMessage());
        }
    }
}
