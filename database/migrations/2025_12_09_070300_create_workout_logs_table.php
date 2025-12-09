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
        Schema::create('workout_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('workout_type_id')->constrained()->onDelete('cascade');
            
            $table->integer('duration_minutes');
            $table->enum('intensity', ['low', 'medium', 'high'])->default('medium');
            $table->decimal('calories_burned', 8, 2);
            $table->dateTime('performed_at');
            
            // Optional fields for strength training
            $table->integer('sets')->nullable();
            $table->integer('reps')->nullable();
            $table->decimal('weight', 8, 2)->nullable(); // in kg or lbs
            
            $table->text('notes')->nullable();
            
            $table->timestamps();
            
            $table->index(['user_id', 'performed_at']);
            $table->index(['user_id', 'workout_type_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('workout_logs');
    }
};
