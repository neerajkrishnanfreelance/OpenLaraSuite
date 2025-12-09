import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function BalanceSheet({ auth, assets, liabilities, equity, totalAssets, totalLiabilities, totalEquity, date }) {
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

    const Section = ({ title, accounts, total }) => (
        <div className="mb-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-3 bg-gray-100 px-4 py-2">{title}</h3>
            <table className="min-w-full">
                <tbody>
                    {accounts && accounts.length > 0 ? (
                        accounts.map(account => (
                            <AccountRow key={account.id} account={account} />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" className="px-4 py-4 text-center text-gray-500">
                                No {title.toLowerCase()} accounts
                            </td>
                        </tr>
                    )}
                    <tr className="border-t-2 font-bold bg-gray-50">
                        <td className="px-4 py-3">Total {title}</td>
                        <td className="px-4 py-3 text-right">${total?.toLocaleString() || '0.00'}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Balance Sheet
                    </h2>
                    <Link
                        href="/accounting/entries/create"
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                    >
                        Create Journal Entry
                    </Link>
                </div>
            }
        >
            <Head title="Balance Sheet" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="mb-6 flex justify-between items-center">
                            <h1 className="text-2xl font-bold text-gray-900">Balance Sheet</h1>
                            <p className="text-gray-600">As of {new Date(date).toLocaleDateString()}</p>
                        </div>

                        <Section title="Assets" accounts={assets} total={totalAssets} />
                        <Section title="Liabilities" accounts={liabilities} total={totalLiabilities} />
                        <Section title="Equity" accounts={equity} total={totalEquity} />

                        {/* Accounting Equation */}
                        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                            <h3 className="font-semibold text-gray-900 mb-2">Accounting Equation</h3>
                            <p className="text-sm text-gray-700">
                                Assets = Liabilities + Equity
                            </p>
                            <p className="text-lg font-bold mt-2">
                                ${totalAssets?.toLocaleString() || '0.00'} =
                                ${totalLiabilities?.toLocaleString() || '0.00'} +
                                ${totalEquity?.toLocaleString() || '0.00'}
                            </p>
                            {Math.abs(totalAssets - (totalLiabilities + totalEquity)) > 0.01 && (
                                <p className="text-red-600 mt-2">
                                    ⚠️ Warning: Balance sheet does not balance!
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
