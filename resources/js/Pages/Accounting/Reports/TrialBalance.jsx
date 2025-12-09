import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function TrialBalance({ auth, accounts, totalDebit, totalCredit, date }) {
    const { data, setData, get } = useForm({
        date: date,
    });

    const handleFilter = (e) => {
        e.preventDefault();
        get(route('accounting.reports.trial-balance'), {
            preserveState: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Trial Balance
                </h2>
            }
        >
            <Head title="Trial Balance" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Filters */}
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <form onSubmit={handleFilter} className="flex items-end gap-4">
                            <div className="flex-1 max-w-xs">
                                <label className="block text-sm font-medium text-gray-700 mb-1">As of Date</label>
                                <input
                                    type="date"
                                    value={data.date}
                                    onChange={(e) => setData('date', e.target.value)}
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
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 border-b border-gray-200">
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold text-gray-900">Trial Balance</h3>
                                <p className="text-gray-500">As of {new Date(date).toLocaleDateString()}</p>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Code</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Debit</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Credit</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {accounts.map((account) => (
                                            (parseFloat(account.debit) !== 0 || parseFloat(account.credit) !== 0) && (
                                                <tr key={account.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {account.code}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {account.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                                                        {account.account_type}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                                                        {parseFloat(account.debit) !== 0 ? `$${parseFloat(account.debit).toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '-'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                                                        {parseFloat(account.credit) !== 0 ? `$${parseFloat(account.credit).toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '-'}
                                                    </td>
                                                </tr>
                                            )
                                        ))}
                                        <tr className="bg-gray-100 font-bold border-t-2 border-gray-300">
                                            <td colSpan="3" className="px-6 py-4 text-right text-sm text-gray-900">
                                                Total:
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                                                ${parseFloat(totalDebit).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                                                ${parseFloat(totalCredit).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                            </td>
                                        </tr>
                                        {Math.abs(totalDebit - totalCredit) > 0.01 && (
                                            <tr className="bg-red-50 text-red-700">
                                                <td colSpan="5" className="px-6 py-3 text-center text-sm font-bold">
                                                    ⚠️ Trial Balance is NOT balanced! Difference: ${Math.abs(totalDebit - totalCredit).toFixed(2)}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
