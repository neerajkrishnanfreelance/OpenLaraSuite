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
        Schema::create('stock_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['buy', 'sell']);
            $table->string('stock_symbol'); // e.g., AAPL
            $table->decimal('quantity', 15, 4);
            $table->decimal('price_per_unit', 15, 2);
            $table->decimal('total_amount', 15, 2);
            $table->decimal('fees', 10, 2)->default(0);
            $table->decimal('net_amount', 15, 2); // total + fees for buy, total - fees for sell
            $table->date('trade_date');
            $table->text('notes')->nullable();
            
            // Link to accounting
            $table->foreignId('accounting_journal_entry_id')->nullable()->constrained('accounting_journal_entries')->onDelete('set null');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock_transactions');
    }
};
