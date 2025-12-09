import BudgetLayout from '@/Layouts/BudgetLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function PlansCreate({ categories }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        budget_type: 'monthly',
        start_date: '',
        end_date: '',
        total_amount: '',
        currency: 'INR',
        status: 'active',
        notes: '',
        allocations: [],
    });

    const [allocations, setAllocations] = useState([]);

    const addAllocation = () => {
        setAllocations([...allocations, { budget_category_id: '', allocated_amount: '', notes: '' }]);
    };

    const removeAllocation = (index) => {
        setAllocations(allocations.filter((_, i) => i !== index));
    };

    const updateAllocation = (index, field, value) => {
        const updated = [...allocations];
        updated[index][field] = value;
        setAllocations(updated);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('budget.plans.store'), {
            ...data,
            allocations,
        });
    };

    const totalAllocated = allocations.reduce((sum, alloc) => sum + (parseFloat(alloc.allocated_amount) || 0), 0);
    const remaining = (parseFloat(data.total_amount) || 0) - totalAllocated;

    return (
        <BudgetLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Budget Plan
                </h2>
            }
        >
            <Head title="Create Budget Plan" />

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Details */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name *</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="e.g., December 2025 Budget"
                                required
                            />
                            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Budget Type *</label>
                            <select
                                value={data.budget_type}
                                onChange={(e) => setData('budget_type', e.target.value)}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="monthly">Monthly</option>
                                <option value="daily">Daily</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                            <select
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                            <input
                                type="date"
                                value={data.start_date}
                                onChange={(e) => setData('start_date', e.target.value)}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
                            <input
                                type="date"
                                value={data.end_date}
                                onChange={(e) => setData('end_date', e.target.value)}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount *</label>
                            <input
                                type="number"
                                step="0.01"
                                value={data.total_amount}
                                onChange={(e) => setData('total_amount', e.target.value)}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="0.00"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                            <input
                                type="text"
                                value={data.currency}
                                onChange={(e) => setData('currency', e.target.value)}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                maxLength="3"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                            <textarea
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                rows="3"
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Category Allocations */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Category Allocations</h3>
                        <button
                            type="button"
                            onClick={addAllocation}
                            className="px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium"
                        >
                            Add Category
                        </button>
                    </div>

                    {allocations.length > 0 ? (
                        <div className="space-y-3">
                            {allocations.map((alloc, index) => (
                                <div key={index} className="flex gap-3 items-start">
                                    <div className="flex-1">
                                        <select
                                            value={alloc.budget_category_id}
                                            onChange={(e) => updateAllocation(index, 'budget_category_id', e.target.value)}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        >
                                            <option value="">Select Category...</option>
                                            {categories.map((cat) => (
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="w-32">
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={alloc.allocated_amount}
                                            onChange={(e) => updateAllocation(index, 'allocated_amount', e.target.value)}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            placeholder="Amount"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeAllocation(index)}
                                        className="px-3 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <div className="mt-4 p-4 bg-gray-50 rounded-md">
                                <div className="flex justify-between text-sm">
                                    <span>Total Allocated:</span>
                                    <span className="font-semibold">₹{totalAllocated.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-sm mt-1">
                                    <span>Remaining:</span>
                                    <span className={`font-semibold ${remaining < 0 ? 'text-red-600' : 'text-green-600'}`}>
                                        ₹{remaining.toLocaleString('en-IN')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-4">No allocations added yet</p>
                    )}
                </div>

                {/* Submit */}
                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium disabled:opacity-50"
                    >
                        Create Plan
                    </button>
                    <button
                        type="button"
                        onClick={() => router.visit('/budget/plans')}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 font-medium"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </BudgetLayout>
    );
}
