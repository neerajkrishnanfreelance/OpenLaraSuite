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
        Schema::create('accounting_journal_entries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('journal_id')->constrained('journals')->onDelete('restrict');
            $table->string('reference')->nullable(); // e.g., "INV/2025/001"
            $table->date('date');
            $table->enum('state', ['draft', 'posted'])->default('draft');
            $table->text('notes')->nullable();
            $table->foreignId('created_by')->constrained('users')->onDelete('restrict');
            $table->foreignId('posted_by')->nullable()->constrained('users')->onDelete('restrict');
            $table->timestamp('posted_at')->nullable();
            $table->timestamps();
            
            // Indexes
            $table->index('journal_id');
            $table->index('date');
            $table->index('state');
            $table->index('reference');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounting_journal_entries');
    }
};
