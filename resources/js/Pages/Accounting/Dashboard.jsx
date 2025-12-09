import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Plus, TrendingUp, TrendingDown, DollarSign, FileText } from 'lucide-react';

export default function AccountingDashboard({ auth, stats, recent_entries }) {
    const StatCard = ({ icon: Icon, title, value, color, trend }) => (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-${color}-100`}>
                    <Icon className={`w-6 h-6 text-${color}-600`} />
                </div>
                {trend && (
                    <span className={`text-sm font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {trend > 0 ? '+' : ''}{trend}%
                    </span>
                )}
            </div>
            <h3 className="text-sm text-gray-600 mb-1">{title}</h3>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    );

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Accounting Dashboard
                    </h2>
                    <div className="flex gap-2">
                        <Link
                            href="/accounting/entries/create"
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            New Journal Entry
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Accounting Dashboard" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                            icon={FileText}
                            title="Total Accounts"
                            value={stats.total_accounts}
                            color="blue"
                        />
                        <StatCard
                            icon={FileText}
                            title="Journal Entries"
                            value={stats.total_entries}
                            color="indigo"
                        />
                        <StatCard
                            icon={TrendingUp}
                            title="Draft Entries"
                            value={stats.draft_entries}
                            color="yellow"
                        />
                        <StatCard
                            icon={TrendingDown}
                            title="Posted Entries"
                            value={stats.posted_entries}
                            color="green"
                        />
                    </div>

                    {/* Financial Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 rounded-lg bg-green-100">
                                    <TrendingUp className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-sm text-gray-600">Total Assets</h3>
                                    <p className="text-2xl font-bold text-gray-900">
                                        ${stats.total_assets?.toLocaleString() || '0.00'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 rounded-lg bg-red-100">
                                    <TrendingDown className="w-6 h-6 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="text-sm text-gray-600">Total Liabilities</h3>
                                    <p className="text-2xl font-bold text-gray-900">
                                        ${stats.total_liabilities?.toLocaleString() || '0.00'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 rounded-lg bg-blue-100">
                                    <DollarSign className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-sm text-gray-600">Total Equity</h3>
                                    <p className="text-2xl font-bold text-gray-900">
                                        ${stats.total_equity?.toLocaleString() || '0.00'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <Link
                            href="/accounting/accounts"
                            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
                        >
                            <h3 className="font-semibold text-gray-900 mb-2">Chart of Accounts</h3>
                            <p className="text-sm text-gray-600">View and manage accounts</p>
                        </Link>

                        <Link
                            href="/accounting/entries"
                            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
                        >
                            <h3 className="font-semibold text-gray-900 mb-2">Journal Entries</h3>
                            <p className="text-sm text-gray-600">View all entries</p>
                        </Link>

                        <Link
                            href="/accounting/reports/balance-sheet"
                            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
                        >
                            <h3 className="font-semibold text-gray-900 mb-2">Balance Sheet</h3>
                            <p className="text-sm text-gray-600">Assets, Liabilities, Equity</p>
                        </Link>

                        <Link
                            href="/accounting/reports/profit-loss"
                            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
                        >
                            <h3 className="font-semibold text-gray-900 mb-2">Profit & Loss</h3>
                            <p className="text-sm text-gray-600">Income and Expenses</p>
                        </Link>
                    </div>

                    {/* Recent Entries */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="font-semibold text-gray-900">Recent Journal Entries</h3>
                        </div>
                        <div className="p-6">
                            {recent_entries && recent_entries.length > 0 ? (
                                <div className="space-y-4">
                                    {recent_entries.map(entry => (
                                        <Link
                                            key={entry.id}
                                            href={`/accounting/entries/${entry.id}`}
                                            className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {entry.reference || `Entry #${entry.id}`}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {entry.journal?.name} • {new Date(entry.date).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <span className={`px-2 py-1 text-xs rounded-full ${entry.state === 'posted'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {entry.state}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-500 py-8">
                                    No journal entries yet. Create your first entry to get started!
                                </p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
