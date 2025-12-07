<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create Roles
        $adminRole = Role::create(['name' => 'admin']);
        $managerRole = Role::create(['name' => 'manager']);
        $employeeRole = Role::create(['name' => 'employee']);

        // Create permissions (optional for now, generally just roles)
        // Permission::create(['name' => 'edit articles']);

        // Create Admin User
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
        $admin->assignRole($adminRole);

        // Create Manager User
        $manager = User::create([
            'name' => 'Manager User',
            'email' => 'manager@example.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
        $manager->assignRole($managerRole);

        // Create Employee User
        $employee = User::create([
            'name' => 'Employee User',
            'email' => 'employee@example.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
        $employee->assignRole($employeeRole);
    }
}
