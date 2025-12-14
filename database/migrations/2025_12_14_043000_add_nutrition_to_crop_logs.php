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
            $table->string('log_type')->default('observation')->after('log_date'); // observation, nutrition, water, harvest
            $table->string('input_name')->nullable()->after('notes'); // e.g. NPK
            $table->decimal('input_quantity', 8, 2)->nullable()->after('input_name');
            $table->string('input_unit')->nullable()->after('input_quantity');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('crop_logs', function (Blueprint $table) {
            $table->dropColumn(['log_type', 'input_name', 'input_quantity', 'input_unit']);
        });
    }
};
