<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EmailConfigurationController extends Controller
{
    public function edit()
    {
        $config = \App\Models\EmailConfiguration::first();
        return \Inertia\Inertia::render('Settings/EmailConfiguration', [
            'config' => $config
        ]);
    }

    public function update(\Illuminate\Http\Request $request)
    {
        $validated = $request->validate([
            'driver' => 'required|string',
            'host' => 'required|string',
            'port' => 'required|string',
            'username' => 'nullable|string',
            'password' => 'nullable|string',
            'encryption' => 'nullable|string',
            'from_address' => 'required|email',
            'from_name' => 'required|string',
        ]);

        $config = \App\Models\EmailConfiguration::first();
        if ($config) {
            $config->update($validated);
        } else {
            \App\Models\EmailConfiguration::create($validated);
        }

        return redirect()->back()->with('success', 'Email configuration updated successfully.');
    }
}
