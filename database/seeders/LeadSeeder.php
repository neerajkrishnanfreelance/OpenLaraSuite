<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Support\Facades\Hash;

class LeadSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::firstOrCreate(
            ['email' => 'john@example.com'],
            ['name' => 'John Doe', 'password' => Hash::make('password')]
        );

        $project = Project::firstOrCreate(
            ['name' => 'Website Redesign'],
            ['status' => 'active', 'start_date' => now()]
        );

        $task = Task::create([
            'project_id' => $project->id,
            'assigned_to' => $user->id,
            'created_by' => $user->id,
            'title' => 'Corporate Website Redesign',
            'contact_name' => 'Sarah Connor',
            'mobile' => '+1 555-0198',
            'expected_revenue' => 8000,
            'stage' => 'Qualified',
            'source' => 'LinkedIn',
            'description' => 'Client wants a modern, fast, SEO-optimized website with CMS integration...',
            'status' => 'todo',
            'priority' => 'high',
            'due_date' => now()->addDays(7),
        ]);
        
        $this->command->info("Lead created with ID: {$task->id}");
    }
}
