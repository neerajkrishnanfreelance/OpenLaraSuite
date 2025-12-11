import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import StatusBadge from '@/Components/StatusBadge';
import PriorityLabel from '@/Components/PriorityLabel';
import ClickableLink from '@/Components/ClickableLink';
import PrimaryButton from '@/Components/PrimaryButton';
import { useState } from 'react';
import { Plus, Filter } from 'lucide-react';

export default function Leads({ auth, leads, lead_stages = [], users, filters }) {
    const [kanbanGroupBy, setKanbanGroupBy] = useState('stage');
    const [filterData, setFilterData] = useState({
        assigned_to: filters.assigned_to || '',
        status: filters.status || '',
        lead_stage_id: filters.lead_stage_id || '',
        search: filters.search || '',
    });

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filterData, [key]: value };
        setFilterData(newFilters);
        router.get(route('crm.leads'), newFilters, { preserveState: true, replace: true });
    };

    // Get Kanban columns based on grouping
    const getKanbanColumns = () => {
        if (kanbanGroupBy === 'stage' && lead_stages.length > 0) {
            return lead_stages.map(stage => ({
                id: stage.id,
                key: stage.id.toString(),
                label: stage.name,
                color: stage.color
            }));
        }
        // Default: Group by Lead Status
        return [
            { id: 'new', key: 'new', label: 'New', color: '#3b82f6' },
            { id: 'contacted', key: 'contacted', label: 'Contacted', color: '#8b5cf6' },
            { id: 'qualified', key: 'qualified', label: 'Qualified', color: '#06b6d4' },
            { id: 'proposal', key: 'proposal', label: 'Proposal', color: '#f59e0b' },
            { id: 'negotiation', key: 'negotiation', label: 'Negotiation', color: '#f97316' },
            { id: 'won', key: 'won', label: 'Won', color: '#10b981' },
            { id: 'lost', key: 'lost', label: 'Lost', color: '#ef4444' },
        ];
    };

    const currentKanbanColumns = getKanbanColumns();

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">CRM Leads - Pipeline View</h2>
                    <div className="flex space-x-2 items-center">
                        {/* Kanban Group Toggle */}
                        <select
                            value={kanbanGroupBy}
                            onChange={(e) => setKanbanGroupBy(e.target.value)}
                            className="bg-white border-gray-300 text-gray-700 text-sm rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block p-1.5"
                        >
                            <option value="status">By Status</option>
                            <option value="stage">By Lead Stage</option>
                        </select>

                        <Link href={route('crm.leads.create')}>
                            <PrimaryButton>
                                <Plus className="w-4 h-4 mr-1" />
                                New Lead
                            </PrimaryButton>
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="CRM Leads" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Filters */}
                    <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-wrap gap-4 items-end">
                        <div className="flex items-center gap-2 text-gray-700 font-medium">
                            <Filter className="w-5 h-5" />
                            <span>Filters:</span>
                        </div>
                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Search</label>
                            <input
                                type="text"
                                className="w-full border-gray-300 rounded-md shadow-sm text-sm"
                                placeholder="Search leads..."
                                value={filterData.search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                            />
                        </div>
                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Assigned To</label>
                            <select
                                className="w-full border-gray-300 rounded-md shadow-sm text-sm"
                                value={filterData.assigned_to}
                                onChange={(e) => handleFilterChange('assigned_to', e.target.value)}
                            >
                                <option value="">All Users</option>
                                {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                            </select>
                        </div>
                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                            <select
                                className="w-full border-gray-300 rounded-md shadow-sm text-sm"
                                value={filterData.status}
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                            >
                                <option value="">All Statuses</option>
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="qualified">Qualified</option>
                                <option value="proposal">Proposal</option>
                                <option value="negotiation">Negotiation</option>
                                <option value="won">Won</option>
                                <option value="lost">Lost</option>
                            </select>
                        </div>
                    </div>

                    {/* Pipeline Kanban View */}
                    <div className="flex space-x-4 overflow-x-auto pb-4 items-start min-h-[500px]">
                        {currentKanbanColumns.map(col => (
                            <div key={col.key} className="w-80 flex-shrink-0 bg-gray-100 rounded-lg p-3">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center">
                                        {col.color && (
                                            <div
                                                className="w-3 h-3 rounded-full mr-2"
                                                style={{ backgroundColor: col.color }}
                                            ></div>
                                        )}
                                        <h3 className="font-bold text-gray-700 uppercase text-xs tracking-wider">
                                            {col.label}
                                        </h3>
                                    </div>
                                    <span className="bg-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded-full font-bold">
                                        {leads.filter(l => {
                                            if (kanbanGroupBy === 'stage') {
                                                return l.lead_stage_id == col.id;
                                            }
                                            return l.status === col.id;
                                        }).length}
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    {leads.filter(l => {
                                        if (kanbanGroupBy === 'stage') {
                                            return l.lead_stage_id == col.id;
                                        }
                                        return l.status === col.id;
                                    }).map(lead => (
                                        <div key={lead.id} className="bg-white p-3 rounded shadow-sm border border-gray-200 hover:shadow-md transition-shadow group relative">
                                            {/* Color Strip for Stage if not grouped by stage */}
                                            {kanbanGroupBy !== 'stage' && lead.lead_stage && (
                                                <div className="absolute left-0 top-3 bottom-3 w-1 rounded-r" style={{ backgroundColor: lead.lead_stage.color }}></div>
                                            )}

                                            <div className="flex justify-between items-start mb-2 pl-2">
                                                <PriorityLabel priority={lead.priority} />
                                                <span className="text-[10px] text-gray-400 font-mono">#{lead.id}</span>
                                            </div>
                                            <Link
                                                href={route('crm.leads.show', lead.id)}
                                                className="font-medium text-gray-900 hover:text-indigo-600 block mb-1 text-sm pl-2"
                                            >
                                                {lead.title}
                                            </Link>
                                            <div className="text-xs text-gray-500 mb-2 pl-2">
                                                {lead.contact ? (
                                                    <span className="flex items-center gap-1">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                                                        {lead.contact.name}
                                                    </span>
                                                ) : lead.contact_name ? (
                                                    <span className="flex items-center gap-1">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                                                        {lead.contact_name}
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-400">No contact</span>
                                                )}
                                            </div>

                                            <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-50 pl-2">
                                                <div className="text-xs font-semibold text-gray-600 flex items-center">
                                                    {lead.assigned_user ? (
                                                        <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-[10px] mr-1">
                                                            {lead.assigned_user.name.charAt(0)}
                                                        </div>
                                                    ) : (
                                                        <div className="w-5 h-5 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-[10px] mr-1">?</div>
                                                    )}
                                                    {lead.expected_revenue > 0 ? (
                                                        <span className="text-green-600 ml-1 font-mono">${parseFloat(lead.expected_revenue).toLocaleString()}</span>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {leads.filter(l => {
                                        if (kanbanGroupBy === 'stage') return l.lead_stage_id == col.id;
                                        return l.status === col.id;
                                    }).length === 0 && (
                                            <div className="text-center text-gray-400 text-xs py-8 border-2 border-dashed border-gray-200 rounded-lg">
                                                Empty
                                            </div>
                                        )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
