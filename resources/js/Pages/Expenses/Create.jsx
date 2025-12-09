import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Plus, Trash2, Save, Send } from 'lucide-react';
import { useState } from 'react';

export default function Create({ auth, products, journals, paymentAccounts }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        date: new Date().toISOString().split('T')[0],
        journal_id: journals[0]?.id || '',
        payment_account_id: '',
        description: '', // Voucher description
        reference: '',
        items: [
            { product_id: '', amount: '', description: '' }
        ],
        action: 'save_draft', // Default action
    });

    const addItem = () => {
        setData('items', [...data.items, { product_id: '', amount: '', description: '' }]);
    };

    const removeItem = (index) => {
        const newItems = data.items.filter((_, i) => i !== index);
        setData('items', newItems);
    };

    const updateItem = (index, field, value) => {
        const newItems = [...data.items];
        newItems[index][field] = value;

        // Auto-fill defaults from product
        if (field === 'product_id') {
            const product = products.find(p => p.id == value);
            if (product) {
                newItems[index]['description'] = product.name;
                newItems[index]['amount'] = product.price || '';
            }
        }

        setData('items', newItems);
    };

    const totalAmount = data.items.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);

    const submit = (e, actionType = 'save_draft') => {
        e.preventDefault();

        // We can't update 'data.action' synchronously here and expect it to be in 'post' immediately if using setData.
        // Instead, use the transform method or update a hidden field? 
        // Better: use `post` with `data` but we can override data in the request transformation or just pass custom data? 
        // Inertia `post` sends current `data`. To change `action` effectively, we should `setData` then `post` in a `useEffect`? No.
        // Easiest way in Inertia w/ hooks: manually merge data in transform.

        post(route('expenses.store'), {
            data: {
                ...data,
                action: actionType
            },
            onSuccess: () => reset('items', 'description', 'reference'),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Log Expense Voucher</h2>}
        >
            <Head title="Log Expense" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border-t-4 border-indigo-500">
                        <div className="p-6 text-gray-900">
                            <form className="space-y-6">

                                {/* Header Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Date</label>
                                        <input
                                            type="date"
                                            value={data.date}
                                            onChange={e => setData('date', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                        {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Reference</label>
                                        <input
                                            type="text"
                                            value={data.reference}
                                            onChange={e => setData('reference', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            placeholder="Receipt # / INV-001"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Voucher Description</label>
                                        <input
                                            type="text"
                                            value={data.description}
                                            onChange={e => setData('description', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            placeholder="e.g. Office Supplies for Dec"
                                        />
                                    </div>
                                </div>

                                {/* Items Table */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-lg font-medium text-gray-900">Expense Items</h3>
                                        <button
                                            type="button"
                                            onClick={addItem}
                                            className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-900 font-semibold"
                                        >
                                            <Plus className="w-4 h-4" /> Add Item
                                        </button>
                                    </div>

                                    <div className="overflow-x-auto border rounded-md">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">Type (Product)</th>
                                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">Description</th>
                                                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Amount</th>
                                                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {data.items.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className="px-3 py-2 bg-white">
                                                            <select
                                                                value={item.product_id}
                                                                onChange={e => updateItem(index, 'product_id', e.target.value)}
                                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                                                required
                                                            >
                                                                <option value="">Select Type</option>
                                                                {products.map(p => (
                                                                    <option key={p.id} value={p.id}>{p.name}</option>
                                                                ))}
                                                            </select>
                                                            {errors[`items.${index}.product_id`] && <p className="text-red-500 text-xs mt-1">{errors[`items.${index}.product_id`]}</p>}
                                                        </td>
                                                        <td className="px-3 py-2 bg-white">
                                                            <input
                                                                type="text"
                                                                value={item.description}
                                                                onChange={e => updateItem(index, 'description', e.target.value)}
                                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                                            />
                                                        </td>
                                                        <td className="px-3 py-2 bg-white">
                                                            <input
                                                                type="number"
                                                                step="0.01"
                                                                min="0"
                                                                value={item.amount}
                                                                onChange={e => updateItem(index, 'amount', e.target.value)}
                                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm text-right font-mono"
                                                                required
                                                            />
                                                            {errors[`items.${index}.amount`] && <p className="text-red-500 text-xs mt-1">{errors[`items.${index}.amount`]}</p>}
                                                        </td>
                                                        <td className="px-3 py-2 text-center bg-white">
                                                            {data.items.length > 1 && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeItem(index)}
                                                                    className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                                <tr className="bg-gray-100 font-bold border-t-2 border-gray-200">
                                                    <td colSpan="2" className="px-3 py-3 text-right text-gray-700">Total Payable:</td>
                                                    <td className="px-3 py-3 text-right text-indigo-700 text-lg font-mono">${totalAmount.toFixed(2)}</td>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    {errors.items && <p className="text-red-500 text-xs mt-1">{errors.items}</p>}
                                </div>

                                {/* Footer Settings */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Journal</label>
                                        <select
                                            value={data.journal_id}
                                            onChange={e => setData('journal_id', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        >
                                            <option value="">Select Journal</option>
                                            {journals.map(j => (
                                                <option key={j.id} value={j.id}>{j.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Paid Via (Credit Account)</label>
                                        <select
                                            value={data.payment_account_id}
                                            onChange={e => setData('payment_account_id', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        >
                                            <option value="">Select Payment Account</option>
                                            {paymentAccounts.map(a => (
                                                <option key={a.id} value={a.id}>{a.code} - {a.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-6 gap-3 border-t">
                                    <button
                                        type="button"
                                        onClick={(e) => submit(e, 'save_draft')}
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150"
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Draft
                                    </button>
                                    <button
                                        type="button"
                                        onClick={(e) => submit(e, 'save_post')}
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 shadow-lg"
                                    >
                                        <Send className="w-4 h-4 mr-2" />
                                        Save & Post
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
