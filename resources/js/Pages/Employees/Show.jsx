import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import StatusBadge from '@/Components/StatusBadge';

export default function Show({ auth, employee, stats }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Employee Profile: {employee.name}</h2>}
        >
            <Head title={employee.name} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-sm font-medium text-gray-500 truncate">Active Projects</div>
                            <div className="mt-1 text-3xl font-semibold text-indigo-600">{stats.active_projects}</div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-sm font-medium text-gray-500 truncate">Pending Tasks</div>
                            <div className="mt-1 text-3xl font-semibold text-yellow-500">{stats.pending_tasks}</div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-sm font-medium text-gray-500 truncate">Hours (This Month)</div>
                            <div className="mt-1 text-3xl font-semibold text-green-600">{stats.hours_this_month}</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Profile Info */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
                            <div className="space-y-3">
                                <div>
                                    <span className="block text-sm font-medium text-gray-500">Name</span>
                                    <span className="text-gray-900">{employee.name}</span>
                                </div>
                                <div>
                                    <span className="block text-sm font-medium text-gray-500">Email</span>
                                    <span className="text-gray-900">{employee.email}</span>
                                </div>
                                <div>
                                    <span className="block text-sm font-medium text-gray-500">Role</span>
                                    <span className="capitalize">{employee.roles[0]?.name}</span>
                                </div>
                            </div>
                        </div>

                        {/* Active Tasks Preview */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Current Tasks</h3>
                            <ul className="space-y-4">
                                {employee.tasks.slice(0, 5).map(task => (
                                    <li key={task.id} className="flex justify-between items-center border-b border-gray-100 pb-2">
                                        <div>
                                            <p className="font-medium text-sm text-gray-800">{task.title}</p>
                                            <p className="text-xs text-gray-500">{task.project?.name}</p>
                                        </div>
                                        <StatusBadge status={task.status} />
                                    </li>
                                ))}
                                {employee.tasks.length === 0 && <li className="text-sm text-gray-500">No active tasks.</li>}
                            </ul>
                            {employee.tasks.length > 5 && (
                                <div className="mt-4 text-center">
                                    <span className="text-xs text-gray-500">And {employee.tasks.length - 5} more...</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
