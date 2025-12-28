import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import StatusBadge from '@/Components/StatusBadge';
import PrimaryButton from '@/Components/PrimaryButton';
import ClickableLink from '@/Components/ClickableLink';
import { useState } from 'react';

export default function Index({ auth, timesheets, projects, users, filters }) {
    const { put } = useForm();
    const [filterData, setFilterData] = useState({
        project_id: filters?.project_id || '',
        user_id: filters?.user_id || '',
        status: filters?.status || '',
        date_from: filters?.date_from || '',
        date_to: filters?.date_to || '',
        is_overtime: filters?.is_overtime === 'true' || filters?.is_overtime === true,
    });

    const handleAction = (id, status) => {
        if (confirm(`Are you sure you want to ${status} this timesheet?`)) {
            put(route('timesheets.update', { timesheet: id, status: status }));
        }
    };

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filterData, [key]: value };
        setFilterData(newFilters);
        router.get(route('timesheets.index'), newFilters, { preserveState: true, replace: true });
    };

    const clearFilters = () => {
        setFilterData({
            project_id: '',
            user_id: '',
            status: '',
            date_from: '',
            date_to: '',
            is_overtime: false,
        });
        router.get(route('timesheets.index'), {}, { preserveState: true, replace: true });
    };

    const isManager = auth.user.roles.some(r => ['admin', 'manager'].includes(r.name));

    const columns = [
        { key: 'date', label: 'Date', render: (item) => new Date(item.date).toLocaleDateString() },
        {
            key: 'user_name',
            label: 'Employee',
            render: (item) => item.user ? <ClickableLink routeName="employees.show" params={item.user.id}>{item.user.name}</ClickableLink> : '-'
        },
        {
            key: 'project_name',
            label: 'Project',
            render: (item) => item.project ? <ClickableLink routeName="projects.show" params={item.project.id}>{item.project.name}</ClickableLink> : '-'
        },
        {
            key: 'task_name',
            label: 'Task',
            render: (item) => item.task ? <ClickableLink routeName="tasks.show" params={item.task.id}>{item.task.title}</ClickableLink> : '-'
        },
        {
            key: 'time',
            label: 'Time',
            render: (item) => {
                const formatTime = (time) => {
                    if (!time) return '';
                    // First try parsing as a full Date object (handles ISO and YYYY-MM-DD HH:mm:ss)
                    const date = new Date(time);
                    if (!isNaN(date.getTime()) && time.length > 8 && (time.includes('T') || time.includes(' '))) {
                        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
                    }

                    // Fallback for simple time strings like "14:30" or "14:30:00"
                    const [hours, minutes] = time.split(':');
                    if (hours !== undefined && minutes !== undefined) {
                        const h = parseInt(hours);
                        if (!isNaN(h)) {
                            const ampm = h >= 12 ? 'PM' : 'AM';
                            const h12 = h % 12 || 12;
                            return `${h12}:${minutes.substring(0, 2)} ${ampm}`;
                        }
                    }
                    return time;
                };

                return (
                    <div className="text-sm">
                        {item.start_time && item.end_time ? (
                            <span className="text-gray-600">{formatTime(item.start_time)} - {formatTime(item.end_time)}</span>
                        ) : (
                            <span className="text-gray-400">-</span>
                        )}
                    </div>
                );
            }
        },
        {
            key: 'hours',
            label: 'Hours',
            render: (item) => (
                <div className="flex items-center">
                    <span className="font-medium">{item.hours}h</span>
                    {item.is_overtime && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
                            OT
                        </span>
                    )}
                </div>
            )
        },
        { key: 'description', label: 'Description', render: (item) => <span className="text-xs truncate block max-w-xs" title={item.description}>{item.description || '-'}</span> },
        { key: 'status', label: 'Status', render: (item) => <StatusBadge status={item.status} /> },
    ];

    const actions = (item) => (
        <div className="flex space-x-2 justify-end">
            {isManager && item.status === 'pending' && (
                <>
                    <button
                        onClick={() => handleAction(item.id, 'approved')}
                        className="text-green-600 hover:text-green-900 font-medium text-xs uppercase"
                    >
                        Approve
                    </button>
                    <button
                        onClick={() => handleAction(item.id, 'rejected')}
                        className="text-red-600 hover:text-red-900 font-medium text-xs uppercase"
                    >
                        Reject
                    </button>
                </>
            )}
            {auth.user.id === item.user_id && item.status === 'pending' && (
                <Link
                    href={route('timesheets.edit', item.id)}
                    className="text-blue-600 hover:text-blue-900 font-medium text-xs uppercase"
                >
                    Edit
                </Link>
            )}
            <button
                onClick={() => {
                    if (confirm('Are you sure you want to delete this timesheet entry?')) {
                        router.delete(route('timesheets.destroy', item.id));
                    }
                }}
                className="text-red-600 hover:text-red-900 font-medium text-xs uppercase"
            >
                Delete
            </button>
        </div>
    );

    const handleExport = () => {
        const params = new URLSearchParams(filterData).toString();
        window.location.href = route('timesheets.export') + '?' + params;
    };

    return (
        <AuthenticatedLayout
            header={<div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Timesheets</h2>
                <div className="flex space-x-2">
                    <button
                        onClick={handleExport}
                        className="px-4 py-2 bg-green-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-green-700"
                    >
                        Export
                    </button>
                    <Link href={route('timesheets.create')}>
                        <PrimaryButton>Log Time</PrimaryButton>
                    </Link>
                </div>
            </div>}
        >
            <Head title="Timesheets" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Filters */}
                    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                        <div className="flex flex-wrap gap-4 items-end">
                            <div className="flex-1 min-w-[200px]">
                                <label className="block text-xs font-medium text-gray-700 mb-1">Project</label>
                                <select
                                    className="w-full border-gray-300 rounded-md shadow-sm text-sm"
                                    value={filterData.project_id}
                                    onChange={(e) => handleFilterChange('project_id', e.target.value)}
                                >
                                    <option value="">All Projects</option>
                                    {projects?.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>
                            </div>
                            <div className="flex-1 min-w-[200px]">
                                <label className="block text-xs font-medium text-gray-700 mb-1">Employee</label>
                                <select
                                    className="w-full border-gray-300 rounded-md shadow-sm text-sm"
                                    value={filterData.user_id}
                                    onChange={(e) => handleFilterChange('user_id', e.target.value)}
                                >
                                    <option value="">All Employees</option>
                                    {users?.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                                </select>
                            </div>
                            <div className="flex-1 min-w-[150px]">
                                <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    className="w-full border-gray-300 rounded-md shadow-sm text-sm"
                                    value={filterData.status}
                                    onChange={(e) => handleFilterChange('status', e.target.value)}
                                >
                                    <option value="">All Statuses</option>
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div>
                            <div className="flex-1 min-w-[150px]">
                                <label className="block text-xs font-medium text-gray-700 mb-1">From Date</label>
                                <input
                                    type="date"
                                    className="w-full border-gray-300 rounded-md shadow-sm text-sm"
                                    value={filterData.date_from}
                                    onChange={(e) => handleFilterChange('date_from', e.target.value)}
                                />
                            </div>
                            <div className="flex-1 min-w-[150px]">
                                <label className="block text-xs font-medium text-gray-700 mb-1">To Date</label>
                                <input
                                    type="date"
                                    className="w-full border-gray-300 rounded-md shadow-sm text-sm"
                                    value={filterData.date_to}
                                    onChange={(e) => handleFilterChange('date_to', e.target.value)}
                                />
                            </div>
                            <div className="flex items-center pb-2">
                                <label className="inline-flex items-center text-xs font-medium text-gray-700">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mr-2"
                                        checked={filterData.is_overtime}
                                        onChange={(e) => handleFilterChange('is_overtime', e.target.checked)}
                                    />
                                    Overtime Only
                                </label>
                            </div>
                            <div>
                                <button
                                    onClick={clearFilters}
                                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    </div>

                    <DataTable
                        columns={columns}
                        data={timesheets.data}
                        pagination={timesheets}
                        actions={actions}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
