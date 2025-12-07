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
        Schema::table('tasks', function (Blueprint $table) {
            $table->string('contact_name')->nullable();
            $table->string('mobile')->nullable();
            $table->decimal('expected_revenue', 15, 2)->nullable();
            $table->string('stage')->nullable(); // e.g., Qualified, Proposition
            $table->string('source')->nullable(); // e.g., LinkedIn
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->dropColumn(['contact_name', 'mobile', 'expected_revenue', 'stage', 'source']);
        });
    }
};
