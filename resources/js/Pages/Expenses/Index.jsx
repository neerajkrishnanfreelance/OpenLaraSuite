import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { CheckCircle, Clock, DollarSign, Calendar, FileText, ExternalLink, Settings } from 'lucide-react';

// Stat Card Component
const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 flex items-center">
        <div className={`p-3 rounded-full ${color} bg-opacity-10 mr-4`}>
            <Icon className={`w-8 h-8 ${color.replace('bg-', 'text-')}`} />
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    </div>
);

export default function Index({ auth, entries, stats }) {

    const handlePost = (id) => {
        router.post(route('expenses.post', id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Expense Dashboard</h2>}
        >
            <Head title="Expense Dashboard" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Actions & Stats */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex gap-2">
                            <Link
                                href={route('expenses.create')}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded shadow flex items-center gap-2"
                            >
                                <DollarSign className="w-4 h-4" /> Log Expense
                            </Link>
                            <Link
                                href={route('expense-products.index')}
                                className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-2 px-4 rounded shadow flex items-center gap-2"
                            >
                                <Settings className="w-4 h-4" /> Types
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatCard
                            title="Today's Spend"
                            value={`$${stats.today_total.toLocaleString()}`}
                            icon={DollarSign}
                            color="bg-green-500"
                        />
                        <StatCard
                            title="Today's Vouchers"
                            value={stats.today_count}
                            icon={FileText}
                            color="bg-blue-500"
                        />
                        <StatCard
                            title="Month to Date"
                            value={`$${stats.month_total.toLocaleString()}`}
                            icon={Calendar}
                            color="bg-purple-500"
                        />
                    </div>

                    {/* Today's Entries List */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-900">Today's Transactions</h3>
                            {stats.today_count === 0 && <span className="text-sm text-gray-500">No entries yet today</span>}
                        </div>
                        <div className="p-0">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ref / Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {entries.length > 0 ? entries.map((entry) => { // entries is array now, not paginated object
                                        // Calculate total debit from lines as 'Amount'
                                        const total = entry.lines.reduce((sum, line) => sum + parseFloat(line.debit), 0);

                                        return (
                                            <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{entry.reference || 'N/A'}</div>
                                                    <div className="text-xs text-gray-500">{new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900 truncate max-w-xs">{entry.notes}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <div className="text-sm font-bold text-gray-900">${total.toFixed(2)}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    {entry.state === 'posted' ? (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 items-center justify-center gap-1">
                                                            <CheckCircle className="w-3 h-3" /> Posted
                                                        </span>
                                                    ) : entry.state === 'cancelled' ? (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 items-center justify-center gap-1">
                                                            Cancelled
                                                        </span>
                                                    ) : (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 items-center justify-center gap-1">
                                                            <Clock className="w-3 h-3" /> Draft
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end gap-2 items-center">

                                                    {/* Smart Button to Journal Entry */}
                                                    <Link
                                                        href={route('accounting.entries.show', entry.id)}
                                                        className="text-gray-400 hover:text-indigo-600 p-1 rounded hover:bg-indigo-50"
                                                        title="View Journal Entry"
                                                    >
                                                        <ExternalLink className="w-5 h-5" />
                                                    </Link>

                                                    {entry.state === 'draft' && (
                                                        <button
                                                            onClick={() => handlePost(entry.id)}
                                                            className="bg-green-50 text-green-600 hover:bg-green-100 px-3 py-1 rounded-full text-xs font-bold border border-green-200"
                                                        >
                                                            POST
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    }) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-4 text-center text-gray-500 italic">
                                                No expenses recorded today.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
