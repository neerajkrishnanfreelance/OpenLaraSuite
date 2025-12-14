import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';

export default function Index({ auth, logs }) {
    const columns = [
        { key: 'log_date', label: 'Date', render: (item) => new Date(item.log_date).toLocaleDateString() },
        {
            key: 'log_type',
            label: 'Activity',
            render: (item) => (
                <span className={`px-2 py-1 text-xs font-bold uppercase rounded ${item.log_type === 'nutrition' ? 'bg-purple-100 text-purple-800' :
                        item.log_type === 'pesticide' ? 'bg-red-100 text-red-800' :
                            item.log_type === 'water' ? 'bg-blue-100 text-blue-800' :
                                item.log_type === 'harvest' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-gray-100 text-gray-800'
                    }`}>
                    {item.log_type}
                </span>
            )
        },
        {
            key: 'crop_name',
            label: 'Crop',
            render: (item) => (
                <Link href={route('agriculture.crops.show', item.crop_id)} className="text-indigo-600 hover:text-indigo-900 font-medium">
                    {item.crop?.name}
                </Link>
            )
        },
        {
            key: 'details',
            label: 'Details',
            render: (item) => (
                <div>
                    {item.log_type === 'nutrition' || item.log_type === 'pesticide' ? (
                        <div className="text-xs">
                            <span className="font-semibold">{item.input_name}</span>
                            {item.input_quantity && ` (${item.input_quantity} ${item.input_unit})`}
                        </div>
                    ) : (
                        <span className="text-gray-600 text-sm truncate max-w-xs block">{item.notes}</span>
                    )}
                </div>
            )
        },
        { key: 'stage', label: 'Stage' },
        {
            key: 'image',
            label: 'Photo',
            render: (item) => item.image_path ? (
                <a href={`/storage/${item.image_path}`} target="_blank" className="text-blue-500 hover:underline text-xs">View</a>
            ) : <span className="text-gray-400 text-xs">-</span>
        }
    ];

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Daily Activities Feed</h2>}
        >
            <Head title="Daily Activities" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <DataTable
                                columns={columns}
                                data={logs.data}
                                pagination={logs}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
