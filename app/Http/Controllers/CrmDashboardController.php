<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\CrmLead;
use App\Models\LeadStage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class CrmDashboardController extends Controller
{
    public function index()
    {
        // Total Contacts
        $totalContacts = Contact::count();
        
        // Active Leads (leads that are not won or lost)
        $activeLeads = CrmLead::whereNotIn('status', ['won', 'lost'])->count();
        
        // Converted Leads (leads marked as won)
        $convertedLeads = CrmLead::where('status', 'won')->count();
        
        // Revenue Pipeline (sum of expected_revenue from active leads)
        $revenuePipeline = CrmLead::whereNotIn('status', ['won', 'lost'])
            ->sum('expected_revenue');
        
        // Recent Contacts (last 5)
        $recentContacts = Contact::with('assignedUser')
            ->orderByDesc('created_at')
            ->limit(5)
            ->get();
        
        // Leads by Stage
        $leadsByStage = LeadStage::withCount(['crmLeads' => function ($query) {
            $query->whereNotIn('status', ['won', 'lost']);
        }])
            ->orderBy('order')
            ->get()
            ->map(function ($stage) {
                return [
                    'name' => $stage->name,
                    'count' => $stage->crm_leads_count,
                    'color' => $stage->color,
                ];
            });
        
        // Recent Activities (recent leads created)
        $recentActivities = CrmLead::with(['contact', 'leadStage', 'assignedUser'])
            ->orderByDesc('created_at')
            ->limit(10)
            ->get();
        
        return Inertia::render('CRM/Dashboard', [
            'kpis' => [
                'totalContacts' => $totalContacts,
                'activeLeads' => $activeLeads,
                'convertedLeads' => $convertedLeads,
                'revenuePipeline' => $revenuePipeline,
            ],
            'recentContacts' => $recentContacts,
            'leadsByStage' => $leadsByStage,
            'recentActivities' => $recentActivities,
        ]);
    }
}
