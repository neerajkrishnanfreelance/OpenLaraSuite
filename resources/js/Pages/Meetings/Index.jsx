import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, meetings }) {
    const { delete: destroy } = useForm();
    const user = auth.user;

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to cancel this meeting?')) {
            destroy(route('meetings.destroy', id));
        }
    };

    const columns = [
        { key: 'title', label: 'Title', render: (item) => <Link href={route('meetings.show', item.id)} className="font-medium text-indigo-600 hover:underline">{item.title}</Link> },
        { key: 'start_time', label: 'Start', render: (item) => new Date(item.start_time).toLocaleString() },
        { key: 'organizer', label: 'Organizer', render: (item) => item.organizer?.name },
        {
            key: 'participants',
            label: 'Participants',
            render: (item) => (
                <div className="flex -space-x-1 overflow-hidden">
                    {item.participants.slice(0, 3).map(p => (
                        <div key={p.id} className="inline-block h-6 w-6 rounded-full bg-gray-200 ring-2 ring-white flex items-center justify-center text-xs text-gray-600" title={p.name}>{p.name[0]}</div>
                    ))}
                    {item.participants.length > 3 && <span className="inline-block h-6 w-6 rounded-full bg-gray-100 ring-2 ring-white flex items-center justify-center text-xs text-gray-500">+{item.participants.length - 3}</span>}
                </div>
            )
        },
    ];

    const actions = (item) => (
        <div className="flex space-x-2 justify-end">
            {item.organizer_id === user.id && (
                <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700 text-xs uppercase font-bold">Cancel</button>
            )}
        </div>
    );

    return (
        <AuthenticatedLayout
            header={<div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Meetings</h2>
                <Link href={route('meetings.create')}>
                    <PrimaryButton>Schedule Meeting</PrimaryButton>
                </Link>
            </div>}
        >
            <Head title="Meetings" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <DataTable
                        columns={columns}
                        data={meetings.data}
                        pagination={meetings}
                        actions={actions}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
