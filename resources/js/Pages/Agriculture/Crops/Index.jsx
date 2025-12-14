import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, crops }) {
    const columns = [
        { key: 'name', label: 'Name', render: (item) => <Link href={route('agriculture.crops.show', item.id)} className="text-indigo-600 hover:text-indigo-900 font-bold">{item.name}</Link> },
        {
            key: 'status',
            label: 'Status',
            render: (item) => (
                <span className={`px-2 py-1 text-xs font-bold uppercase rounded ${item.status === 'active' ? 'bg-green-100 text-green-800' :
                        item.status === 'harvested' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                    {item.status}
                </span>
            )
        },
        { key: 'type', label: 'Type' },
        { key: 'variety', label: 'Variety' },
        { key: 'planting_date', label: 'Planted' },
        {
            key: 'check_r_n_d',
            label: 'R&D',
            render: (item) => item.check_r_n_d ? <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">R&D</span> : null
        },
        {
            key: 'actions',
            label: 'Actions',
            render: (item) => (
                <div className="flex space-x-2">
                    <Link href={route('agriculture.crops.edit', item.id)} className="text-gray-600 hover:text-gray-900 text-sm">Edit</Link>
                </div>
            )
        }
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Your Crops</h2>
                    <Link href={route('agriculture.crops.create')}>
                        <PrimaryButton>+ New Crop</PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Crops List" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6">
                            <DataTable
                                columns={columns}
                                data={crops.data}
                                pagination={crops}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
