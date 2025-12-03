<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TimesheetController extends Controller
{
    /**
     * Display a listing of the resource (The Timesheets Page).
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        // --- 1. DUMMY DATA SETUP ---
        $statsData = [
            [ 
                'title' => "This Week", 
                'value' => "41.5h", 
                'icon' => "fas fa-calendar-week", 
                'iconColor' => "text-purple-500", 
                'progressPercent' => 78, 
                'progressColor' => "bg-purple-500", 
                'footerText' => "78% of 53h goal" 
            ],
            [ 
                'title' => "Overtime", 
                'value' => "+4.5h", 
                'icon' => "fas fa-clock", 
                'iconColor' => "text-red-500", 
                'progressPercent' => 45, 
                'progressColor' => "bg-red-500", 
                'footerText' => "Alert: Review allocation" 
            ],
            [ 
                'title' => "December Total", 
                'value' => "168h", 
                'icon' => "fas fa-calendar", 
                'iconColor' => "text-indigo-500", 
                'progressPercent' => 92, 
                'progressColor' => "bg-indigo-500", 
                'footerText' => "92% of 183h target" 
            ],
            [ 
                'title' => "On Time", 
                'value' => "98%", 
                'icon' => "fas fa-check-circle", 
                'iconColor' => "text-green-500", 
                'progressPercent' => 98, 
                'progressColor' => "bg-green-500", 
                'footerText' => "Excellent performance" 
            ],
        ];

        $timesheetEntries = [
            [
                'date' => "December 2, 2025", 'employee' => "John Doe", 'project' => "Payment Gateway", 
                'task' => "Backend Integration", 'status' => "Running", 'timeRange' => "08:30 AM → Live", 
                'hours' => "9.5h", 'overtime' => "+1.5h", 'initialBg' => "bg-purple-100 text-purple-600"
            ],
            [
                'date' => "December 1, 2025", 'employee' => "John Doe", 'project' => "Client Portal v2", 
                'task' => "UI/UX Refinement", 'status' => "Completed", 'timeRange' => "09:00 AM – 05:30 PM", 
                'hours' => "8.5h", 'overtime' => "—", 'initialBg' => "bg-blue-100 text-blue-600"
            ],
            [
                'date' => "November 30, 2025", 'employee' => "Sarah Connor", 'project' => "Mobile App Testing", 
                'task' => "QA & Bug Fixes", 'status' => "Completed", 'timeRange' => "10:00 AM – 06:30 PM", 
                'hours' => "8.5h", 'overtime' => "—", 'initialBg' => "bg-green-100 text-green-600"
            ],
            // Add more entries here in a real application...
        ];

        $employees = [
            ['id' => 1, 'name' => 'John Doe'],
            ['id' => 2, 'name' => 'Sarah Connor'],
        ];

        // --- 2. INERTIA RENDER ---
        return Inertia::render('test/BasicLayout', [
            // Passes data to the Timesheets.jsx component as props
            'stats' => $statsData,
            'timesheets' => $timesheetEntries,
            'employees' => $employees,
            'currentEmployee' => [
                'name' => 'John Doe', 
                'role' => 'Administrator'
            ],
            'initialSidebarState' => false,
        ]);
    }
    
    /**
     * Handle the submission of a new timesheet entry.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        // 1. Validate the request data
        // 2. Save the new entry to the database
        // 3. Redirect back to the timesheets index page
        
        return redirect()->route('test.BasicLayout')->with('success', 'Timesheet entry created successfully.');
    }
}