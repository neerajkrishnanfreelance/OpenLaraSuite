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
        Schema::table('accounting_journal_entries', function (Blueprint $table) {
            $table->string('state')->default('draft')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("ALTER TABLE accounting_journal_entries MODIFY COLUMN state ENUM('draft', 'posted') NOT NULL DEFAULT 'draft'");
    }
};
