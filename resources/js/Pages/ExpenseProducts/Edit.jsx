import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ auth, product, accounts, journals }) {
    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        description: product.description || '',
        price: product.price || '',
        is_expense: product.is_expense,
        expense_account_id: product.expense_account_id || '',
        journal_id: product.journal_id || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('expenses.update', product.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Expense</h2>}
        >
            <Head title="Edit Expense" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    {errors.name && <div className="text-red-500 text-xs italic">{errors.name}</div>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    {errors.description && <div className="text-red-500 text-xs italic">{errors.description}</div>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                        Price
                                    </label>
                                    <input
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                    />
                                    {errors.price && <div className="text-red-500 text-xs italic">{errors.price}</div>}
                                </div>

                                <div className="mb-4 hidden">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        <input
                                            type="checkbox"
                                            className="mr-2 leading-tight"
                                            checked={data.is_expense}
                                            onChange={(e) => setData('is_expense', e.target.checked)}
                                        />
                                        <span className="text-sm">Is Expense Product</span>
                                    </label>
                                </div>

                                {data.is_expense && (
                                    <>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expense_account_id">
                                                Expense Account
                                            </label>
                                            <select
                                                id="expense_account_id"
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                value={data.expense_account_id}
                                                onChange={(e) => setData('expense_account_id', e.target.value)}
                                            >
                                                <option value="">Select Account</option>
                                                {accounts.map((account) => (
                                                    <option key={account.id} value={account.id}>
                                                        {account.code} - {account.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.expense_account_id && <div className="text-red-500 text-xs italic">{errors.expense_account_id}</div>}
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="journal_id">
                                                Default Journal
                                            </label>
                                            <select
                                                id="journal_id"
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                value={data.journal_id}
                                                onChange={(e) => setData('journal_id', e.target.value)}
                                            >
                                                <option value="">Select Journal</option>
                                                {journals.map((journal) => (
                                                    <option key={journal.id} value={journal.id}>
                                                        {journal.name} ({journal.code})
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.journal_id && <div className="text-red-500 text-xs italic">{errors.journal_id}</div>}
                                        </div>
                                    </>
                                )}

                                <div className="flex items-center justify-end">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="submit"
                                        disabled={processing}
                                    >
                                        Update Expense
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
