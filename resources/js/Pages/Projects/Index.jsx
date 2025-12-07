import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import StatusBadge from '@/Components/StatusBadge';
import PrimaryButton from '@/Components/PrimaryButton';
import ClickableLink from '@/Components/ClickableLink';

export default function Index({ auth, projects }) {
    const { flash } = usePage().props;
    console.log(flash)
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
        // <div>ddd</div>
        <AuthenticatedLayout
            header={<div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Projects</h2>
                <Link href={route('projects.create')}>
                    <PrimaryButton>New Project</PrimaryButton>
                </Link>
            </div>}
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {flash && (
                        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{flash.message}</span>
                        </div>
                    )}

                    <DataTable
                        columns={columns}
                        data={projects.data}
                        pagination={projects}
                        actions={actions}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
