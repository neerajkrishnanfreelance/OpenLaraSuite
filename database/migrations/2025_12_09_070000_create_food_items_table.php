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
        Schema::create('food_items', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('brand')->nullable();
            $table->decimal('serving_size', 8, 2);
            $table->string('serving_unit', 50); // g, ml, cup, piece, etc.
            
            // Nutrition values per serving
            $table->decimal('calories', 8, 2);
            $table->decimal('protein', 8, 2)->default(0);
            $table->decimal('carbs', 8, 2)->default(0);
            $table->decimal('fats', 8, 2)->default(0);
            $table->decimal('fiber', 8, 2)->default(0);
            $table->decimal('sugar', 8, 2)->default(0);
            $table->decimal('sodium', 8, 2)->default(0); // in mg
            
            $table->string('category', 50)->nullable(); // fruits, vegetables, protein, grains, dairy, snacks, beverages
            $table->boolean('is_custom')->default(false); // user-created vs system items
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            
            $table->timestamps();
            $table->softDeletes();
            
            $table->index(['name', 'category']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('food_items');
    }
};
