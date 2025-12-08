import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import StatusBadge from '@/Components/StatusBadge';
import PriorityLabel from '@/Components/PriorityLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import ClickableLink from '@/Components/ClickableLink';
import { useState } from 'react';

export default function Index({ auth, tasks, projects, users, filters }) {
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'kanban'
    const [filterData, setFilterData] = useState({
        project_id: filters.project_id || '',
        assigned_to: filters.assigned_to || '',
        status: filters.status || '',
    });

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

    // Kanban Columns
    const kanbanColumns = ['todo', 'in_progress', 'review', 'done'];

    return (
        <AuthenticatedLayout
            header={<div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Tasks</h2>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setViewMode('list')}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${viewMode === 'list' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        List
                    </button>
                    <button
                        onClick={() => setViewMode('kanban')}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${viewMode === 'kanban' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        Kanban
                    </button>
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
                        <PrimaryButton>New Task</PrimaryButton>
                    </Link>
                </div>
            </div>}
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Filters */}
                    <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-wrap gap-4">
                        <select
                            className="border-gray-300 rounded-md shadow-sm"
                            value={filterData.project_id}
                            onChange={(e) => handleFilterChange('project_id', e.target.value)}
                        >
                            <option value="">All Projects</option>
                            {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                        <select
                            className="border-gray-300 rounded-md shadow-sm"
                            value={filterData.assigned_to}
                            onChange={(e) => handleFilterChange('assigned_to', e.target.value)}
                        >
                            <option value="">All Employees</option>
                            {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                        </select>
                        <select
                            className="border-gray-300 rounded-md shadow-sm"
                            value={filterData.status}
                            onChange={(e) => handleFilterChange('status', e.target.value)}
                        >
                            <option value="">All Statuses</option>
                            <option value="todo">To Do</option>
                            <option value="in_progress">In Progress</option>
                            <option value="review">Review</option>
                            <option value="done">Done</option>
                        </select>
                    </div>

                    {viewMode === 'list' ? (
                        <DataTable
                            columns={columns}
                            data={tasks.data || []} // Handle pagination or array
                            pagination={tasks.links ? tasks : null} // Only paginate if list
                            actions={actions}
                        />
                    ) : (
                        <div className="flex space-x-4 overflow-x-auto pb-4">
                            {kanbanColumns.map(status => (
                                <div key={status} className="w-80 flex-shrink-0 bg-gray-100 rounded-lg p-4">
                                    <h3 className="font-bold text-gray-700 mb-4 uppercase text-sm">{status.replace('_', ' ')}</h3>
                                    <div className="space-y-3">
                                        {(tasks.data || tasks).filter(t => t.status === status).map(task => (
                                            <div key={task.id} className="bg-white p-3 rounded shadow-sm border border-gray-200">
                                                <div className="flex justify-between items-start mb-2">
                                                    <PriorityLabel priority={task.priority} />
                                                    <span className="text-xs text-gray-400">#{task.id}</span>
                                                </div>
                                                <ClickableLink routeName="tasks.show" params={task.id} className="font-medium text-gray-900 hover:text-indigo-600 block mb-1">
                                                    {task.title}
                                                </ClickableLink>
                                                <div className="text-xs text-gray-500 mb-2">
                                                    {task.project ? <ClickableLink routeName="projects.show" params={task.project.id}>{task.project.name}</ClickableLink> : '-'}
                                                </div>
                                                <div className="flex justify-between items-center mt-3">
                                                    <div className="text-xs font-semibold text-gray-600">
                                                        {task.assigned_user?.name ? task.assigned_user.name.split(' ')[0] : 'Unassigned'}
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <Link href={route('tasks.edit', task.id)} className="text-xs text-indigo-500 hover:underline">
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => {
                                                                if (confirm('Are you sure you want to delete this task?')) {
                                                                    router.delete(route('tasks.destroy', task.id));
                                                                }
                                                            }}
                                                            className="text-xs text-red-500 hover:underline"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {(tasks.data || tasks).filter(t => t.status === status).length === 0 && (
                                            <div className="text-center text-gray-400 text-sm py-4">No tasks</div>
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
