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
        Schema::table('crop_logs', function (Blueprint $table) {
            $table->integer('duration_minutes')->nullable()->after('log_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('crop_logs', function (Blueprint $table) {
            $table->dropColumn('duration_minutes');
        });
    }
};
