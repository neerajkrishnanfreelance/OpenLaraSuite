import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, transactions }) {

    const columns = [
        { key: 'trade_date', label: 'Date', render: (item) => new Date(item.trade_date).toLocaleDateString() },
        {
            key: 'type',
            label: 'Type',
            render: (item) => (
                <span className={`px-2 py-1 text-xs font-bold uppercase rounded ${item.type === 'buy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {item.type}
                </span>
            )
        },
        { key: 'stock_symbol', label: 'Symbol', render: (item) => <span className="font-mono font-bold">{item.stock_symbol}</span> },
        { key: 'quantity', label: 'Qty' },
        { key: 'price_per_unit', label: 'Price' },
        { key: 'total_amount', label: 'Total' },
        { key: 'fees', label: 'Fees' },
        { key: 'net_amount', label: 'Net Amount', render: (item) => <span className="font-semibold">{item.net_amount}</span> },
        { key: 'notes', label: 'Notes', render: (item) => <span className="text-xs">{item.notes}</span> },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Stock Market</h2>
                    <Link href={route('stocks.create')}>
                        <PrimaryButton>New Trade</PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Stocks" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6">
                            <DataTable
                                columns={columns}
                                data={transactions.data}
                                pagination={transactions}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
