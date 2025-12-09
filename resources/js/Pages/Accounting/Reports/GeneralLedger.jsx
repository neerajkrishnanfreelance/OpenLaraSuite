import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function GeneralLedger({ auth, accounts, selectedAccount, lines, startDate, endDate }) {
    const { data, setData, get } = useForm({
        account_id: selectedAccount?.id || '',
        start_date: startDate,
        end_date: endDate,
    });

    const handleFilter = (e) => {
        e.preventDefault();
        get(route('accounting.reports.general-ledger'), {
            preserveState: true,
        });
    };

    // Calculate totals
    const totalDebit = lines ? lines.reduce((sum, line) => sum + parseFloat(line.debit || 0), 0) : 0;
    const totalCredit = lines ? lines.reduce((sum, line) => sum + parseFloat(line.credit || 0), 0) : 0;
    const balanceChange = totalDebit - totalCredit;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    General Ledger
                </h2>
            }
        >
            <Head title="General Ledger" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Filters */}
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <form onSubmit={handleFilter} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Account</label>
                                <select
                                    value={data.account_id}
                                    onChange={(e) => setData('account_id', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">Select Account</option>
                                    {accounts.map(account => (
                                        <option key={account.id} value={account.id}>
                                            {account.code} - {account.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                <input
                                    type="date"
                                    value={data.start_date}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                <input
                                    type="date"
                                    value={data.end_date}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                            >
                                Run Report
                            </button>
                        </form>
                    </div>

                    {/* Report Content */}
                    {selectedAccount ? (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">
                                            {selectedAccount.code} - {selectedAccount.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 capitalize">
                                            Type: {selectedAccount.account_type}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">
                                            Period: {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Journal</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Debit</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Credit</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {lines.length > 0 ? (
                                                lines.map((line) => (
                                                    <tr key={line.id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            {new Date(line.created_at).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {line.journal_entry?.journal?.name || '-'}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {line.journal_entry?.reference || '-'}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-500">
                                                            {line.description}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                                                            {parseFloat(line.debit) > 0 ? `$${parseFloat(line.debit).toFixed(2)}` : '-'}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                                                            {parseFloat(line.credit) > 0 ? `$${parseFloat(line.credit).toFixed(2)}` : '-'}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                                        No transactions found for this period.
                                                    </td>
                                                </tr>
                                            )}
                                            {/* Totals Row */}
                                            {lines.length > 0 && (
                                                <tr className="bg-gray-50 font-bold">
                                                    <td colSpan="4" className="px-6 py-4 text-right text-sm text-gray-900">
                                                        Period Totals:
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                                                        ${totalDebit.toFixed(2)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                                                        ${totalCredit.toFixed(2)}
                                                    </td>
                                                </tr>
                                            )}
                                            {/* Balance Change Row */}
                                            {lines.length > 0 && (
                                                <tr className="bg-gray-100 font-bold border-t border-gray-300">
                                                    <td colSpan="4" className="px-6 py-4 text-right text-sm text-gray-900">
                                                        Net Change:
                                                    </td>
                                                    <td colSpan="2" className={`px-6 py-4 whitespace-nowrap text-center text-sm ${balanceChange >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                                                        ${balanceChange.toFixed(2)} {balanceChange >= 0 ? '(Dr)' : '(Cr)'}
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow p-12 text-center">
                            <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">Select an account</h3>
                            <p className="mt-1 text-gray-500">Choose an account above to view its general ledger entries.</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
