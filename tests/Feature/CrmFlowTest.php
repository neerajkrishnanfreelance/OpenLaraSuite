<?php

namespace Tests\Feature;

use App\Models\Contact;
use App\Models\LeadStage;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CrmFlowTest extends TestCase
{
    // Use RefreshDatabase if you want to reset DB, but might wipe user data if not careful.
    // For this dev environment, maybe just cleanup created records.
    use RefreshDatabase; 

    public function test_crm_full_flow()
    {
        // 1. Create User
        $user = User::factory()->create();
        $this->actingAs($user);

        // 2. Create Project (required for Task) - wait, Lead is a Task, does it need a Project? 
        // Logic says yes: 'project_id' => 'required'. 
        // So a Lead is currently a Task UNDER a Project? Or is there a "General" project?
        // The user didn't specify "Lead is independent of Project".
        // In `TaskController`, `project_id` is required.
        // I should stick to that constraint or create a dummy project.
        // Create Project manually since Factory might not exist
        $project = Project::create([
            'name' => 'General Leads Project',
            'description' => 'Test Project',
            'status' => 'planning',
            'start_date' => now(),
            'created_by' => $user->id
        ]);

        // 3. Create Contact
        $contact = Contact::create([
            'name' => 'Test Contact',
            'email' => 'test@example.com',
            'hourly_rate' => 100.00
        ]);
        $this->assertDatabaseHas('contacts', ['email' => 'test@example.com']);

        // 4. Create Lead Stage
        $stage = LeadStage::create([
            'name' => 'New',
            'order' => 1
        ]);
        $this->assertDatabaseHas('lead_stages', ['name' => 'New']);

        // 5. Create Task (Lead)
        // Note: TaskController->store expects request data.
        // We can test the Model creation directly or the Endpoint.
        // Let's test Endpoint for full integration coverage.
        $response = $this->post(route('tasks.store'), [
            'project_id' => $project->id,
            'title' => 'Potential Big Deal',
            'status' => 'todo',
            'priority' => 'medium',
            'contact_id' => $contact->id,
            'lead_stage_id' => $stage->id,
            'expected_revenue' => 5000,
            'contact_name' => 'Duplicate Name' // Check if this saves
        ]);

        $response->assertRedirect('tasks');
        $this->assertDatabaseHas('tasks', [
            'title' => 'Potential Big Deal',
            'contact_id' => $contact->id,
            'lead_stage_id' => $stage->id,
            'expected_revenue' => 5000
        ]);

        $task = Task::where('title', 'Potential Big Deal')->first();

        // 6. Convert to Project
        $response = $this->post(route('tasks.convert-to-project', $task->id));

        $response->assertRedirect(); // Should redirect to project show
        
        // 7. Verify Results
        // Project created
        $this->assertDatabaseHas('projects', [
            'name' => 'Potential Big Deal',
            'status' => 'planning'
        ]);

        // Task updated
        $task->refresh();
        $this->assertEquals('Won', $task->stage);
        $this->assertEquals('done', $task->status);
        
        // Cleanup if RefreshDatabase is not used
        $task->delete();
        $project->delete(); // Created project
        $contact->forceDelete();
        $stage->delete();
        // $user->delete(); // Keep user?
    }
}
