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
        Schema::create('accounts', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique(); // e.g., "1000", "2000"
            $table->string('name'); // e.g., "Cash", "Accounts Payable"
            $table->enum('account_type', ['asset', 'liability', 'equity', 'income', 'expense']);
            $table->foreignId('parent_id')->nullable()->constrained('accounts')->onDelete('set null');
            $table->boolean('is_active')->default(true);
            $table->decimal('balance', 15, 2)->default(0); // Current balance
            $table->text('description')->nullable();
            $table->timestamps();
            
            // Indexes
            $table->index('code');
            $table->index('account_type');
            $table->index('parent_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounts');
    }
};
