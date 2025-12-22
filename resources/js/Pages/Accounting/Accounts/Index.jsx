import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, X, Edit2, Trash2 } from 'lucide-react';

export default function ChartOfAccounts({ auth, accounts }) {
    const [showModal, setShowModal] = useState(false);
    const [editingAccount, setEditingAccount] = useState(null);

    const { data, setData, post, put, processing, reset } = useForm({
        code: '',
        name: '',
        account_type: 'asset',
        parent_id: '',
        description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingAccount) {
            put(`/accounting/accounts/${editingAccount.id}`, {
                onSuccess: () => {
                    setShowModal(false);
                    setEditingAccount(null);
                    reset();
                }
            });
        } else {
            post('/accounting/accounts', {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                }
            });
        }
    };

    const handleEdit = (account) => {
        setEditingAccount(account);
        setData({
            code: account.code,
            name: account.name,
            account_type: account.account_type,
            parent_id: account.parent_id || '',
            description: account.description || '',
        });
        setShowModal(true);
    };

    const handleDelete = (accountId) => {
        if (confirm('Delete this account?')) {
            fetch(`/accounting/accounts/${accountId}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
            }).then(() => window.location.reload());
        }
    };

    const getAccountsByType = (type) => {
        return accounts.filter(a => a.account_type === type);
    };

    const AccountSection = ({ title, type, color }) => {
        const typeAccounts = getAccountsByType(type);

        return (
            <div className="bg-white rounded-lg shadow mb-6">
                <div className={`p-4 border-b border-gray-200 bg-${color}-50`}>
                    <h3 className={`font-semibold text-${color}-900`}>{title} ({typeAccounts.length})</h3>
                </div>
                <div className="p-4">
                    {typeAccounts.length > 0 ? (
                        <table className="min-w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-2">Code</th>
                                    <th className="text-left py-2">Name</th>
                                    <th className="text-right py-2">Balance</th>
                                    <th className="text-right py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {typeAccounts.map(account => (
                                    <tr key={account.id} className="border-b hover:bg-gray-50">
                                        <td className="py-2">{account.code}</td>
                                        <td className="py-2">
                                            <Link
                                                href={`/accounting/accounts/${account.id}`}
                                                className="text-indigo-600 hover:text-indigo-800"
                                            >
                                                {account.name}
                                            </Link>
                                        </td>
                                        <td className="py-2 text-right font-medium">
                                            ${account.balance?.toLocaleString() || '0.00'}
                                        </td>
                                        <td className="py-2 text-right">
                                            <button
                                                onClick={() => handleEdit(account)}
                                                className="text-blue-600 hover:text-blue-800 mr-3"
                                            >
                                                <Edit2 className="w-4 h-4 inline" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(account.id)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <Trash2 className="w-4 h-4 inline" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500 text-center py-4">No {title.toLowerCase()} accounts</p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Chart of Accounts
                    </h2>
                    <button
                        onClick={() => {
                            setEditingAccount(null);
                            reset();
                            setShowModal(true);
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
                    >
                        New Account
                    </button>
                </div>
            }
        >
            <Head title="Chart of Accounts" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AccountSection title="Assets" type="asset" color="green" />
                    <AccountSection title="Liabilities" type="liability" color="red" />
                    <AccountSection title="Equity" type="equity" color="blue" />
                    <AccountSection title="Income" type="income" color="indigo" />
                    <AccountSection title="Expenses" type="expense" color="orange" />
                </div>
            </div>

            {/* Create/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">
                                {editingAccount ? 'Edit Account' : 'New Account'}
                            </h3>
                            <button onClick={() => { setShowModal(false); setEditingAccount(null); reset(); }}>
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Code *</label>
                                <input
                                    type="text"
                                    value={data.code}
                                    onChange={(e) => setData('code', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                                <select
                                    value={data.account_type}
                                    onChange={(e) => setData('account_type', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                >
                                    <option value="asset">Asset</option>
                                    <option value="liability">Liability</option>
                                    <option value="equity">Equity</option>
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    rows="3"
                                />
                            </div>

                            <div className="flex gap-2 pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                >
                                    {editingAccount ? 'Update' : 'Create'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setShowModal(false); setEditingAccount(null); reset(); }}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
