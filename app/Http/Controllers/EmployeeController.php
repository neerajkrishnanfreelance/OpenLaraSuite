<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Only Admin/Manager should see this usually, handled by middleware or policy
        $users = User::with('roles')
            ->when($request->search, function($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%");
            })
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Employees/Index', [
            'users' => $users,
            'filters' => $request->only('search'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Employees/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|in:admin,manager,employee',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $user->assignRole($validated['role']);

        return redirect()->route('employees.index')->with('message', 'Employee created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $employee)
    {
        // Load stats for the dashboard View of an employee
        $employee->load(['roles', 'projects', 'tasks' => function($q) {
            $q->whereNull('status')->orWhere('status', '!=', 'done');
        }]);

        return Inertia::render('Employees/Show', [
            'employee' => $employee,
            'stats' => [
                'active_projects' => $employee->projects()->where('status', 'active')->count(),
                'pending_tasks' => $employee->tasks()->where('status', '!=', 'done')->count(),
                'hours_this_month' => $employee->timesheets()->whereMonth('date', now()->month)->sum('hours'),
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $employee)
    {
        $employee->load(['roles', 'chatterMessages.user', 'relatedMeetings.organizer']);
        return Inertia::render('Employees/Edit', [
            'employee' => $employee,
            'roles' => \Spatie\Permission\Models\Role::all(),
            'chatter_data' => $employee->chatterMessages,
            'meetings_data' => $employee->relatedMeetings,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $employee)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email,'.$employee->id,
            'role' => 'required|in:admin,manager,employee',
        ]);

        $employee->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        $employee->syncRoles([$validated['role']]);

        return redirect()->route('employees.index')->with('message', 'Employee updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $employee)
    {
        $employee->delete(); // Soft delete
        return redirect()->route('employees.index')->with('message', 'Employee deactivated.');
    }
}
