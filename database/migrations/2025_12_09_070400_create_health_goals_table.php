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
        Schema::create('health_goals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // Daily nutrition targets
            $table->decimal('daily_calorie_target', 8, 2)->nullable();
            $table->decimal('daily_protein_target', 8, 2)->nullable();
            $table->decimal('daily_carbs_target', 8, 2)->nullable();
            $table->decimal('daily_fats_target', 8, 2)->nullable();
            
            // Workout targets
            $table->integer('weekly_workout_target')->default(3); // Number of workouts per week
            $table->integer('weekly_workout_minutes_target')->nullable(); // Total minutes per week
            
            // Weight tracking
            $table->decimal('current_weight', 8, 2)->nullable();
            $table->decimal('target_weight', 8, 2)->nullable();
            $table->string('weight_unit', 10)->default('kg'); // kg or lbs
            
            // Water intake
            $table->decimal('daily_water_target', 8, 2)->nullable(); // in liters
            
            // Date tracking
            $table->date('start_date')->nullable();
            $table->date('target_date')->nullable();
            
            $table->timestamps();
            
            $table->unique('user_id'); // One active goal per user
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('health_goals');
    }
};
