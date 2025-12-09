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
        Schema::create('budget_entries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('budget_plan_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('budget_category_id')->constrained()->onDelete('cascade');
            $table->date('entry_date'); // Date of spending
            $table->decimal('amount', 15, 2); // Spent amount
            $table->text('description')->nullable();
            $table->enum('payment_method', ['cash', 'card', 'upi', 'bank_transfer', 'other'])->default('cash');
            $table->string('receipt_url')->nullable(); // Optional receipt/proof
            $table->timestamps();
            
            // Indexes
            $table->index('user_id');
            $table->index('budget_plan_id');
            $table->index('budget_category_id');
            $table->index('entry_date');
            $table->index(['user_id', 'entry_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('budget_entries');
    }
};
