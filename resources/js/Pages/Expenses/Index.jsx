import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { CheckCircle, Clock } from 'lucide-react';

export default function Index({ auth, entries }) {

    const handlePost = (id) => {
        router.post(route('expenses.post', id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Expense Vouchers</h2>}
        >
            <Head title="Expenses" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-end mb-4 gap-2">
                        <Link
                            href={route('expense-products.index')}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Manage Expense Types
                        </Link>
                        <Link
                            href={route('expenses.create')}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Log New Expense
                        </Link>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {entries.data.map((entry) => {
                                        // Calculate total debit from lines as 'Amount'
                                        const total = entry.lines.reduce((sum, line) => sum + parseFloat(line.debit), 0);

                                        return (
                                            <tr key={entry.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">{new Date(entry.date).toLocaleDateString()}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{entry.reference}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{entry.notes}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">${total.toFixed(2)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    {entry.state === 'posted' ? (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 flex items-center gap-1 justify-center">
                                                            <CheckCircle className="w-3 h-3" /> Posted
                                                        </span>
                                                    ) : (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 flex items-center gap-1 justify-center">
                                                            <Clock className="w-3 h-3" /> Draft
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <Link href={route('accounting.entries.show', entry.id)} className="text-indigo-600 hover:text-indigo-900 mr-4">View</Link>
                                                    {entry.state === 'draft' && (
                                                        <button
                                                            onClick={() => handlePost(entry.id)}
                                                            className="text-green-600 hover:text-green-900"
                                                        >
                                                            Post
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            {entries.data.length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                    No expenses recorded yet.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
