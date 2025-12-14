import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import StatusBadge from '@/Components/StatusBadge';
import PrimaryButton from '@/Components/PrimaryButton';
import ClickableLink from '@/Components/ClickableLink';
import KanbanBoard from '@/Components/Projects/KanbanBoard';
import { useState, useEffect } from 'react';
import { LayoutList, LayoutGrid, Filter, X } from 'lucide-react';

export default function Index({ auth, projects, filters = {} }) {
    const { flash } = usePage().props;
    const [viewMode, setViewMode] = useState(localStorage.getItem('projectsViewMode') || 'list');
    const [showFilters, setShowFilters] = useState(false);

    // Filter State
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || 'all');
    const [dateRange, setDateRange] = useState(filters.date_range || '');

    useEffect(() => {
        localStorage.setItem('projectsViewMode', viewMode);
    }, [viewMode]);

    // Debounce search and apply filters
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (
                search !== (filters.search || '') ||
                status !== (filters.status || 'all') ||
                dateRange !== (filters.date_range || '')
            ) {
                router.get(
                    route('projects.index'),
                    { search, status, dateRange },
                    { preserveState: true, replace: true }
                );
            }
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [search, status, dateRange]);

    const columns = [
        { key: 'name', label: 'Name', render: (item) => <ClickableLink routeName="projects.show" params={item.id}>{item.name}</ClickableLink> },
        {
            key: 'status',
            label: 'Status',
            render: (item) => <StatusBadge status={item.status} />
        },
        {
            key: 'start_date',
            label: 'Start Date',
            render: (item) => item.start_date ? new Date(item.start_date).toLocaleDateString() : '-'
        },
        {
            key: 'users',
            label: 'Team',
            render: (item) => (
                <div className="flex -space-x-2 overflow-hidden">
                    {item.users && item.users.length > 0 ? (
                        <>
                            {item.users.slice(0, 3).map(user => (
                                <div key={user.id} className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-700" title={user?.name}>
                                    {user?.name ? user.name.charAt(0) : '?'}
                                </div>
                            ))}
                            {item.users.length > 3 && (
                                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500">
                                    +{item.users.length - 3}
                                </div>
                            )}
                        </>
                    ) : (
                        <span className="text-xs text-gray-400">No Team</span>
                    )}
                </div>
            )
        },
    ];

    const actions = (item) => (
        <div className="flex space-x-4 justify-end">
            <Link href={route('projects.show', item.id)} className="text-indigo-600 hover:text-indigo-900">View</Link>
            <Link href={route('projects.edit', item.id)} className="text-gray-600 hover:text-gray-900">Edit</Link>
            <button
                onClick={() => {
                    if (confirm(`Are you sure you want to delete project "${item.name}"? This will also delete all associated tasks and timesheets.`)) {
                        router.delete(route('projects.destroy', item.id));
                    }
                }}
                className="text-red-600 hover:text-red-900"
            >
                Delete
            </button>
        </div>
    );

    return (
        <AuthenticatedLayout
            header={<div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Projects</h2>
                <div className="flex items-center space-x-2">
                    <div className="bg-white rounded-md shadow-sm border border-gray-300 flex p-1 mr-4">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                            title="List View"
                        >
                            <LayoutList size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode('kanban')}
                            className={`p-1.5 rounded ${viewMode === 'kanban' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                            title="Kanban View"
                        >
                            <LayoutGrid size={18} />
                        </button>
                    </div>
                    <Link href={route('projects.planning')} className="mr-2">
                        <button className="px-4 py-2 bg-purple-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-purple-700">
                            Planning Report
                        </button>
                    </Link>
                    <Link href={route('projects.create')}>
                        <PrimaryButton>New Project</PrimaryButton>
                    </Link>
                </div>
            </div>}
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {flash && flash.message && (
                        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{flash.message}</span>
                        </div>
                    )}

                    {/* Filters Bar */}
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center">
                            <div className="flex-1 w-full">
                                <input
                                    type="text"
                                    placeholder="Search projects..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="w-full sm:w-48">
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="all">All Statuses</option>
                                    <option value="active">Active</option>
                                    <option value="on_hold">On Hold</option>
                                    <option value="completed">Completed</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {viewMode === 'list' ? (
                        <DataTable
                            columns={columns}
                            data={projects.data}
                            pagination={projects}
                            actions={actions}
                        />
                    ) : (
                        <KanbanBoard projects={projects.data} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
