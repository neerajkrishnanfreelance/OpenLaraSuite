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
        Schema::create('daily_food_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('food_item_id')->constrained()->onDelete('cascade');
            
            $table->enum('meal_type', ['breakfast', 'lunch', 'dinner', 'snack'])->default('snack');
            $table->decimal('servings', 8, 2)->default(1);
            $table->dateTime('consumed_at');
            
            // Calculated nutrition values (stored for historical accuracy)
            $table->decimal('total_calories', 8, 2);
            $table->decimal('total_protein', 8, 2)->default(0);
            $table->decimal('total_carbs', 8, 2)->default(0);
            $table->decimal('total_fats', 8, 2)->default(0);
            $table->decimal('total_fiber', 8, 2)->default(0);
            
            $table->text('notes')->nullable();
            
            $table->timestamps();
            
            $table->index(['user_id', 'consumed_at']);
            $table->index(['user_id', 'meal_type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daily_food_logs');
    }
};
