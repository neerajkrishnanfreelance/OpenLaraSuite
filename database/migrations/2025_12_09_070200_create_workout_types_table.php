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
        Schema::create('workout_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('category', ['cardio', 'strength', 'flexibility', 'sports', 'other'])->default('other');
            $table->decimal('calories_per_minute', 8, 2)->default(5); // Average calories burned per minute
            $table->text('description')->nullable();
            $table->string('icon')->nullable(); // Icon name or emoji
            
            $table->timestamps();
            
            $table->index('category');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('workout_types');
    }
};
