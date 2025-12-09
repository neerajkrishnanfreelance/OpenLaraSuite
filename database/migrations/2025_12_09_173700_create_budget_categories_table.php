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
        Schema::create('budget_categories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name'); // e.g., "Food", "Transport", "Entertainment"
            $table->text('description')->nullable();
            $table->string('color')->default('#3B82F6'); // Hex color for UI
            $table->string('icon')->default('DollarSign'); // Lucide icon name
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            // Indexes
            $table->index('user_id');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('budget_categories');
    }
};
