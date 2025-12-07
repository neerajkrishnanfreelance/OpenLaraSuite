import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import StatusBadge from '@/Components/StatusBadge';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, requests }) {
    const { put } = useForm();
    const isManager = auth.user.roles.some(r => ['admin', 'manager'].includes(r.name));

    const handleAction = (id, status) => {
        if (confirm(`Are you sure you want to ${status} this request?`)) {
            put(route('overtime-requests.update', { overtime_request: id, status: status }));
        }
    };

    const columns = [
        { key: 'date', label: 'Date', render: (item) => new Date(item.date).toLocaleDateString() },
        { key: 'user', label: 'Employee', render: (item) => item.user?.name },
        { key: 'time', label: 'Time', render: (item) => `${item.start_time} - ${item.end_time}` },
        { key: 'reason', label: 'Reason' },
        { key: 'status', label: 'Status', render: (item) => <StatusBadge status={item.status} /> },
        { key: 'approver', label: 'Approver', render: (item) => item.approver?.name || '-' },
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
        </div>
    );

    return (
        <AuthenticatedLayout
            header={<div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Overtime Requests</h2>
                <Link href={route('overtime-requests.create')}>
                    <PrimaryButton>Request Overtime</PrimaryButton>
                </Link>
            </div>}
        >
            <Head title="Overtime Requests" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <DataTable
                        columns={columns}
                        data={requests.data}
                        pagination={requests}
                        actions={actions}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
