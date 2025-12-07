import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import StatusBadge from '@/Components/StatusBadge';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Index({ auth, timesheets, projects }) {
    const { put } = useForm();

    const handleAction = (id, status) => {
        if (confirm(`Are you sure you want to ${status} this timesheet?`)) {
            put(route('timesheets.update', { timesheet: id, status: status }));
        }
    };

    const isManager = auth.user.roles.some(r => ['admin', 'manager'].includes(r.name));

    const columns = [
        { key: 'date', label: 'Date', render: (item) => new Date(item.date).toLocaleDateString() },
        { key: 'user_name', label: 'Employee', render: (item) => item.user?.name },
        { key: 'project_name', label: 'Project', render: (item) => item.project?.name },
        { key: 'hours', label: 'Hours' },
        { key: 'description', label: 'Description', render: (item) => <span className="text-xs truncate block max-w-xs" title={item.description}>{item.description}</span> },
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
            {/* Allow own edit if pending? Not implemented in UI to keep simple, backend allows it */}
        </div>
    );

    return (
        <AuthenticatedLayout
            header={<div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Timesheets</h2>
                <Link href={route('timesheets.create')}>
                    <PrimaryButton>Log Time</PrimaryButton>
                </Link>
            </div>}
        >
            <Head title="Timesheets" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
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
