import BudgetLayout from '@/Layouts/BudgetLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Edit, Calendar, TrendingUp, Plus } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function PlansShow({ plan, categories }) {
    const { data, setData, post, processing, reset } = useForm({
        budget_category_id: '',
        amount: '',
        description: '',
        entry_date: new Date().toISOString().split('T')[0],
        payment_method: 'cash',
        budget_plan_id: plan.id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/budget/entries', {
            onSuccess: () => reset(),
        });
    };

    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

    const allocationData = plan.allocations.map((alloc) => ({
        name: alloc.category.name,
        value: parseFloat(alloc.spent_amount),
        allocated: parseFloat(alloc.allocated_amount),
        color: alloc.category.color,
    }));

    return (
        <BudgetLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        {plan.name}
                    </h2>
                    <Link
                        href={`/budget/plans/${plan.id}/edit`}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium flex items-center gap-2"
                    >
                        <Edit className="w-4 h-4" />
                        Edit Plan
                    </Link>
                </div>
            }
        >
            <Head title={plan.name} />

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <p className="text-sm text-gray-600 mb-1">Total Budget</p>
                    <p className="text-2xl font-bold text-gray-900">₹{parseFloat(plan.total_amount).toLocaleString('en-IN')}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <p className="text-sm text-gray-600 mb-1">Spent</p>
                    <p className="text-2xl font-bold text-red-600">₹{parseFloat(plan.spent_amount).toLocaleString('en-IN')}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <p className="text-sm text-gray-600 mb-1">Remaining</p>
                    <p className="text-2xl font-bold text-green-600">₹{parseFloat(plan.remaining_amount).toLocaleString('en-IN')}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <p className="text-sm text-gray-600 mb-1">Progress</p>
                    <p className="text-2xl font-bold text-purple-600">{plan.progress_percentage}%</p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-purple-600 h-2 rounded-full"
                            style={{ width: `${Math.min(plan.progress_percentage, 100)}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Category Allocations */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Allocations</h3>
                    {plan.allocations.length > 0 ? (
                        <>
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie
                                        data={allocationData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={60}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name }) => name}
                                    >
                                        {allocationData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="mt-4 space-y-2">
                                {plan.allocations.map((alloc) => (
                                    <div key={alloc.id} className="border-b border-gray-200 pb-2">
                                        <div className="flex justify-between items-center mb-1">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: alloc.category.color }}
                                                />
                                                <span className="font-medium text-gray-900">{alloc.category.name}</span>
                                            </div>
                                            <span className="text-sm text-gray-600">
                                                ₹{parseFloat(alloc.spent_amount).toLocaleString('en-IN')} / ₹{parseFloat(alloc.allocated_amount).toLocaleString('en-IN')}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                                            <div
                                                className="bg-indigo-600 h-1.5 rounded-full"
                                                style={{
                                                    width: `${Math.min((parseFloat(alloc.spent_amount) / parseFloat(alloc.allocated_amount)) * 100, 100)}%`
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p className="text-gray-500 text-center py-8">No allocations defined</p>
                    )}
                </div>

                {/* Quick Add Entry */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Entry to This Plan</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <input
                                type="date"
                                value={data.entry_date}
                                onChange={(e) => setData('entry_date', e.target.value)}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                value={data.budget_category_id}
                                onChange={(e) => setData('budget_category_id', e.target.value)}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            >
                                <option value="">Select...</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                            <input
                                type="number"
                                step="0.01"
                                value={data.amount}
                                onChange={(e) => setData('amount', e.target.value)}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="0.00"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <input
                                type="text"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                            <select
                                value={data.payment_method}
                                onChange={(e) => setData('payment_method', e.target.value)}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="cash">Cash</option>
                                <option value="card">Card</option>
                                <option value="upi">UPI</option>
                                <option value="bank_transfer">Bank Transfer</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium disabled:opacity-50"
                        >
                            Add Entry
                        </button>
                    </form>
                </div>
            </div>

            {/* Recent Entries */}
            <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Entries for This Plan</h3>
                </div>
                <div className="divide-y divide-gray-200">
                    {plan.entries.length > 0 ? (
                        plan.entries.map((entry) => (
                            <div key={entry.id} className="p-4 hover:bg-gray-50">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <div
                                                className="w-3 h-3 rounded-full"
                                                style={{ backgroundColor: entry.budget_category.color }}
                                            />
                                            <p className="font-medium text-gray-900">{entry.budget_category.name}</p>
                                        </div>
                                        {entry.description && (
                                            <p className="text-sm text-gray-600">{entry.description}</p>
                                        )}
                                        <p className="text-xs text-gray-500 mt-1">
                                            {new Date(entry.entry_date).toLocaleDateString('en-IN')} • {entry.payment_method}
                                        </p>
                                    </div>
                                    <p className="text-lg font-semibold text-red-600">
                                        -₹{parseFloat(entry.amount).toLocaleString('en-IN')}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            No entries yet for this plan
                        </div>
                    )}
                </div>
            </div>
        </BudgetLayout>
    );
}
