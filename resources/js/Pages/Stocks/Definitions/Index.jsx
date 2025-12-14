import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, stocks }) {

    const columns = [
        { key: 'symbol', label: 'Symbol', render: (item) => <span className="font-mono font-bold text-indigo-600">{item.symbol}</span> },
        { key: 'name', label: 'Name' },
        { key: 'sector', label: 'Sector' },
        { key: 'description', label: 'Description', render: (item) => <span className="text-xs text-gray-500 truncate max-w-xs block">{item.description}</span> },
        {
            key: 'is_active',
            label: 'Status',
            render: (item) => (
                <span className={`px-2 py-1 text-xs font-bold uppercase rounded ${item.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {item.is_active ? 'Active' : 'Inactive'}
                </span>
            )
        },
        {
            key: 'actions',
            label: 'Actions',
            render: (item) => (
                <div className="flex space-x-2">
                    <Link href={route('stocks-definitions.edit', item.id)} className="text-indigo-600 hover:text-indigo-900 font-medium">Edit</Link>
                </div>
            )
        }
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Stock List</h2>
                    <Link href={route('stocks-definitions.create')}>
                        <PrimaryButton>+ Add Stock</PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Stocks List" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6">
                            <DataTable
                                columns={columns}
                                data={stocks.data}
                                pagination={stocks}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
