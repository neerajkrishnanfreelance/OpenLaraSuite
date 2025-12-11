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
        Schema::table('scheduled_activities', function (Blueprint $table) {
            // Add polymorphic columns
            $table->morphs('activityable');
            
            // Make task_id nullable since we'll use polymorphic relationship instead
            $table->foreignId('task_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('scheduled_activities', function (Blueprint $table) {
            $table->dropMorphs('activityable');
            $table->foreignId('task_id')->nullable(false)->change();
        });
    }
};
