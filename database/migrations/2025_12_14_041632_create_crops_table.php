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
        Schema::create('crops', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type')->nullable(); // Fruit, Veg, Herb, etc.
            $table->string('variety')->nullable();
            $table->date('planting_date')->nullable();
            $table->date('harvest_date')->nullable(); // Expected
            $table->string('status')->default('active'); // active, harvested, failed
            $table->boolean('check_r_n_d')->default(false);
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('crops');
    }
};
