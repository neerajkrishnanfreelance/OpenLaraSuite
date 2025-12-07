import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, users }) {
    const columns = [
        { key: 'name', label: 'Name', render: (item) => <Link href={route('employees.show', item.id)} className="font-semibold text-indigo-600 hover:underline">{item.name}</Link> },
        { key: 'email', label: 'Email' },
        { key: 'role', label: 'Role', render: (item) => <span className="capitalize bg-gray-100 rounded px-2 py-1 text-xs font-bold text-gray-600">{item.roles[0]?.name}</span> },
        { key: 'joined', label: 'Joined', render: (item) => new Date(item.created_at).toLocaleDateString() },
    ];

    const actions = (item) => (
        <div className="flex space-x-2 justify-end">
            <Link href={route('employees.edit', item.id)} className="text-gray-600 hover:text-gray-900">Edit</Link>
        </div>
    );

    return (
        <AuthenticatedLayout
            header={<div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Employees</h2>
                <Link href={route('employees.create')}>
                    <PrimaryButton>Add Employee</PrimaryButton>
                </Link>
            </div>}
        >
            <Head title="Employees" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <DataTable
                        columns={columns}
                        data={users.data}
                        pagination={users}
                        actions={actions}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
