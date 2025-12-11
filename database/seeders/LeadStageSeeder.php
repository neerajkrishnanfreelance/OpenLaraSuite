<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LeadStageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $stages = [
            [
                'name' => 'Prospecting',
                'color' => '#3b82f6', // Blue
                'order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Qualification',
                'color' => '#8b5cf6', // Purple
                'order' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Proposal',
                'color' => '#06b6d4', // Cyan
                'order' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Negotiation',
                'color' => '#f59e0b', // Amber
                'order' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Closed Won',
                'color' => '#10b981', // Green
                'order' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Closed Lost',
                'color' => '#ef4444', // Red
                'order' => 6,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('lead_stages')->insert($stages);
    }
}
