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
        Schema::table('contacts', function (Blueprint $table) {
            $table->string('status')->default('prospect')->after('email'); // Active, Prospect, Converted, Lost
            $table->foreignId('assigned_to')->nullable()->constrained('users')->nullOnDelete()->after('status');
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete()->after('assigned_to');
            $table->json('tags')->nullable()->after('description');
            $table->string('source')->nullable()->after('tags');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('contacts', function (Blueprint $table) {
            $table->dropForeign(['assigned_to']);
            $table->dropForeign(['created_by']);
            $table->dropColumn(['status', 'assigned_to', 'created_by', 'tags', 'source']);
        });
    }
};
