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
        Schema::create('budget_allocations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('budget_plan_id')->constrained()->onDelete('cascade');
            $table->foreignId('budget_category_id')->constrained()->onDelete('cascade');
            $table->decimal('allocated_amount', 15, 2); // Amount allocated to this category
            $table->text('notes')->nullable();
            $table->timestamps();
            
            // Indexes
            $table->index('budget_plan_id');
            $table->index('budget_category_id');
            
            // Unique constraint: one allocation per category per plan
            $table->unique(['budget_plan_id', 'budget_category_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('budget_allocations');
    }
};
