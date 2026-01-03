import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import StatusBadge from '@/Components/StatusBadge';
import PriorityLabel from '@/Components/PriorityLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import ClickableLink from '@/Components/ClickableLink';
import FilterBar from '@/Components/FilterBar';
import { useState, useMemo } from 'react';

export default function Index({ auth, tasks, projects, users, lead_stages = [], filters }) {
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'kanban'
    const [filterData, setFilterData] = useState({
        project_id: filters.project_id || '',
        assigned_to: filters.assigned_to || '',
        status: filters.status || '',
        groupBy: 'status', // default group by
        search: filters.search || '',
    });

    // Update kanbanGroupBy when filterData.groupBy changes
    const kanbanGroupBy = filterData.groupBy;
    const setKanbanGroupBy = (val) => handleFilterChange('groupBy', val);

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filterData, [key]: value };
        setFilterData(newFilters);
        router.get(route('tasks.index'), newFilters, { preserveState: true, replace: true });
    };

    const columns = [
        { key: 'title', label: 'Title', render: (item) => <ClickableLink routeName="tasks.show" params={item.id}>{item.title}</ClickableLink> },
        { key: 'project', label: 'Project', render: (item) => item.project ? <ClickableLink routeName="projects.show" params={item.project.id}>{item.project.name}</ClickableLink> : '-' },
        { key: 'assigned_to', label: 'Assigned To', render: (item) => item.assigned_user ? <ClickableLink routeName="employees.show" params={item.assigned_user.id}>{item.assigned_user.name}</ClickableLink> : 'Unassigned' },
        { key: 'priority', label: 'Priority', render: (item) => <PriorityLabel priority={item.priority} /> },
        { key: 'status', label: 'Status', render: (item) => <StatusBadge status={item.status} /> },
        { key: 'due_date', label: 'Due Date', render: (item) => item.due_date ? new Date(item.due_date).toLocaleDateString() : '-' },
    ];

    const actions = (item) => (
        <div className="flex space-x-4 justify-end">
            <Link href={route('tasks.show', item.id)} className="text-indigo-600 hover:text-indigo-900">View</Link>
            <Link href={route('tasks.edit', item.id)} className="text-gray-600 hover:text-gray-900">Edit</Link>
            <button
                onClick={() => {
                    if (confirm(`Are you sure you want to delete task "${item.title}"?`)) {
                        router.delete(route('tasks.destroy', item.id));
                    }
                }}
                className="text-red-600 hover:text-red-900"
            >
                Delete
            </button>
        </div>
    );

    // Determines columns based on grouping preference
    const getKanbanColumns = () => {
        if (kanbanGroupBy === 'stage' && lead_stages.length > 0) {
            // Group by Lead Stage
            // We return objects to include id for filtering
            return lead_stages.map(stage => ({
                id: stage.id,
                key: stage.id.toString(),
                label: stage.name,
                color: stage.color
            }));
        }
        // Default: Group by Task Status
        return ['todo', 'in_progress', 'review', 'done'].map(status => ({
            id: status,
            key: status,
            label: status.replace('_', ' '),
            color: null
        }));
    };

    const currentKanbanColumns = getKanbanColumns();

    return (
        <AuthenticatedLayout
            header={<div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Tasks / Leads</h2>
                <div className="flex space-x-2 items-center">
                    {/* View Toggle */}
                    <div className="bg-gray-200 p-1 rounded-md flex">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${viewMode === 'list' ? 'bg-white shadow text-gray-800' : 'text-gray-600 hover:text-gray-800'}`}
                        >
                            List
                        </button>
                        <button
                            onClick={() => setViewMode('kanban')}
                            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${viewMode === 'kanban' ? 'bg-white shadow text-gray-800' : 'text-gray-600 hover:text-gray-800'}`}
                        >
                            Kanban
                        </button>
                    </div>



                    <button
                        onClick={() => {
                            const params = new URLSearchParams(filterData).toString();
                            window.location.href = route('tasks.export') + '?' + params;
                        }}
                        className="px-4 py-2 bg-green-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-green-700"
                    >
                        Export
                    </button>
                    <Link href={route('tasks.create')}>
                        <PrimaryButton>New</PrimaryButton>
                    </Link>
                </div>
            </div>}
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Filters */}
                    {/* Filters using FilterBar */}
                    <div className="mb-6">
                        <FilterBar
                            filters={[
                                // Quick Filters
                                { key: 'assigned_to', value: auth.user.id.toString(), label: 'My Tasks' },
                                { key: 'assigned_to', value: 'unassigned', label: 'Unassigned' },
                                { key: 'priority', value: 'high', label: 'High Priority' },
                                { key: 'status', value: 'todo', label: 'To Do' },
                                { key: 'status', value: 'done', label: 'Done' },
                            ]}
                            groupByOptions={[
                                { value: 'status', label: 'Status' },
                                { value: 'stage', label: 'Lead Stage' },
                                { value: 'project', label: 'Project' }, // Example, handling in frontend list might be needed or just API
                                { value: 'assigned_to', label: 'Assigned User' }
                            ]}
                            activeFilters={filterData}
                            onFilterChange={handleFilterChange}
                        />
                    </div>

                    {viewMode === 'list' ? (
                        <DataTable
                            columns={columns}
                            data={tasks.data || []} // Handle pagination or array
                            pagination={tasks.links ? tasks : null} // Only paginate if list
                            actions={actions}
                        />
                    ) : (
                        <div className="flex space-x-4 overflow-x-auto pb-4 items-start min-h-[500px]">
                            {currentKanbanColumns.map(col => (
                                <div key={col.key} className="w-80 flex-shrink-0 bg-gray-100 rounded-lg p-3">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-bold text-gray-700 uppercase text-xs tracking-wider">
                                            {col.label}
                                        </h3>
                                        <span className="bg-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded-full font-bold">
                                            {(tasks.data || tasks).filter(t => {
                                                if (kanbanGroupBy === 'stage') {
                                                    // For stage grouping, check lead_stage_id. 
                                                    // If task has no stage, it might go to 'Uncategorized' if we had one, or just hide.
                                                    // Here we filter by col.id which is lead_stage_id
                                                    return t.lead_stage_id == col.id;
                                                }
                                                return t.status === col.id;
                                            }).length}
                                        </span>
                                    </div>

                                    <div className="space-y-3">
                                        {(tasks.data || tasks).filter(t => {
                                            if (kanbanGroupBy === 'stage') {
                                                // Handle type mismatch if id is string/int
                                                return t.lead_stage_id == col.id;
                                            }
                                            return t.status === col.id;
                                        }).map(task => (
                                            <div key={task.id} className="bg-white p-3 rounded shadow-sm border border-gray-200 hover:shadow-md transition-shadow group relative">
                                                {/* Color Strip for Stage if not grouped by stage */}
                                                {kanbanGroupBy !== 'stage' && task.lead_stage && (
                                                    <div className="absolute left-0 top-3 bottom-3 w-1 rounded-r bg-indigo-500" style={{ backgroundColor: task.lead_stage.color }}></div>
                                                )}

                                                <div className="flex justify-between items-start mb-2 pl-2">
                                                    <PriorityLabel priority={task.priority} />
                                                    <span className="text-[10px] text-gray-400 font-mono">#{task.id}</span>
                                                </div>
                                                <ClickableLink routeName="tasks.show" params={task.id} className="font-medium text-gray-900 hover:text-indigo-600 block mb-1 text-sm pl-2">
                                                    {task.title}
                                                </ClickableLink>
                                                <div className="text-xs text-gray-500 mb-2 pl-2">
                                                    {task.contact ? (
                                                        <span className="flex items-center gap-1">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                                                            {task.contact.name}
                                                        </span>
                                                    ) : (
                                                        task.project ? task.project.name : '-'
                                                    )}
                                                </div>

                                                <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-50 pl-2">
                                                    <div className="text-xs font-semibold text-gray-600 flex items-center">
                                                        {task.assigned_user ? (
                                                            <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-[10px] mr-1">
                                                                {task.assigned_user.name.charAt(0)}
                                                            </div>
                                                        ) : (
                                                            <div className="w-5 h-5 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-[10px] mr-1">?</div>
                                                        )}
                                                        {task.expected_revenue > 0 ? (
                                                            <span className="text-green-600 ml-1 font-mono">${task.expected_revenue}</span>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {(tasks.data || tasks).filter(t => {
                                            if (kanbanGroupBy === 'stage') return t.lead_stage_id == col.id;
                                            return t.status === col.id;
                                        }).length === 0 && (
                                                <div className="text-center text-gray-400 text-xs py-8 border-2 border-dashed border-gray-200 rounded-lg">
                                                    Empty
                                                </div>
                                            )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
