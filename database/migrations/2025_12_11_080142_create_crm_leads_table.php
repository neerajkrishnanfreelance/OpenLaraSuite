<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('crm_leads', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            
            // Contact Information
            $table->foreignId('contact_id')->nullable()->constrained('contacts')->onDelete('set null');
            $table->string('contact_name')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('company')->nullable();
            
            // Lead Details
            $table->foreignId('lead_stage_id')->nullable()->constrained('lead_stages')->onDelete('set null');
            $table->decimal('expected_revenue', 15, 2)->default(0);
            $table->string('source')->nullable(); // LinkedIn, Website, Referral, etc.
            $table->foreignId('medium_id')->nullable()->constrained('media')->onDelete('set null');
            $table->enum('priority', ['low', 'medium', 'high'])->default('medium');
            $table->enum('status', ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost'])->default('new');
            
            // Assignment
            $table->foreignId('assigned_to')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            
            // Dates
            $table->date('expected_close_date')->nullable();
            $table->timestamp('last_contact_date')->nullable();
            
            // Additional Info
            $table->json('tags')->nullable();
            $table->text('notes')->nullable();
            
            $table->timestamps();
            $table->softDeletes();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('crm_leads');
    }
};
