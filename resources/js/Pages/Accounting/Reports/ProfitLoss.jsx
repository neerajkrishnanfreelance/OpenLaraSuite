import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function ProfitLoss({ auth, income, expenses, totalIncome, totalExpenses, netProfit, startDate, endDate }) {
    const AccountRow = ({ account }) => (
        <tr className="hover:bg-gray-50">
            <td className="px-4 py-2">
                <Link
                    href={`/accounting/accounts/${account.id}`}
                    className="text-indigo-600 hover:text-indigo-800"
                >
                    {account.code} - {account.name}
                </Link>
            </td>
            <td className="px-4 py-2 text-right font-medium">
                ${account.balance?.toLocaleString() || '0.00'}
            </td>
        </tr>
    );

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Profit & Loss Statement
                </h2>
            }
        >
            <Head title="Profit & Loss" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">Profit & Loss Statement</h1>
                            <p className="text-gray-600">
                                {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
                            </p>
                        </div>

                        {/* Income */}
                        <div className="mb-6">
                            <h3 className="font-semibold text-lg text-gray-900 mb-3 bg-green-100 px-4 py-2">Income</h3>
                            <table className="min-w-full">
                                <tbody>
                                    {income && income.length > 0 ? (
                                        income.map(account => (
                                            <AccountRow key={account.id} account={account} />
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="2" className="px-4 py-4 text-center text-gray-500">
                                                No income accounts
                                            </td>
                                        </tr>
                                    )}
                                    <tr className="border-t-2 font-bold bg-gray-50">
                                        <td className="px-4 py-3">Total Income</td>
                                        <td className="px-4 py-3 text-right">${totalIncome?.toLocaleString() || '0.00'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Expenses */}
                        <div className="mb-6">
                            <h3 className="font-semibold text-lg text-gray-900 mb-3 bg-red-100 px-4 py-2">Expenses</h3>
                            <table className="min-w-full">
                                <tbody>
                                    {expenses && expenses.length > 0 ? (
                                        expenses.map(account => (
                                            <AccountRow key={account.id} account={account} />
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="2" className="px-4 py-4 text-center text-gray-500">
                                                No expense accounts
                                            </td>
                                        </tr>
                                    )}
                                    <tr className="border-t-2 font-bold bg-gray-50">
                                        <td className="px-4 py-3">Total Expenses</td>
                                        <td className="px-4 py-3 text-right">${totalExpenses?.toLocaleString() || '0.00'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Net Profit/Loss */}
                        <div className={`p-4 rounded-lg ${netProfit >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-bold text-gray-900">
                                    {netProfit >= 0 ? 'Net Profit' : 'Net Loss'}
                                </h3>
                                <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                                    ${Math.abs(netProfit)?.toLocaleString() || '0.00'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
