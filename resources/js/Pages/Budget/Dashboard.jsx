import BudgetLayout from '@/Layouts/BudgetLayout';
import { Head, Link } from '@inertiajs/react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Plus, Calendar, TrendingUp, TrendingDown } from 'lucide-react';

export default function BudgetDashboard({
    activePlans,
    monthlyTrend,
    categories,
}) {
    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800 border-green-200';
            case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getProgressColor = (percentage) => {
        if (percentage >= 90) return 'bg-red-600';
        if (percentage >= 75) return 'bg-yellow-600';
        return 'bg-green-600';
    };

    return (
        <BudgetLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Budget Dashboard
                    </h2>
                    <div className="flex gap-2">
                        <Link
                            href="/budget/entries/calendar"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium flex items-center gap-2"
                        >
                            <Calendar className="w-4 h-4" />
                            Add Entry
                        </Link>
                        <Link
                            href="/budget/plans/create"
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            New Budget
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Budget Dashboard" />

            {/* Monthly Spending Trend Graph */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Spending Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyTrend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
                        <Legend />
                        <Bar dataKey="budget" fill="#3b82f6" name="Budget" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="spent" fill="#ef4444" name="Spent" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Monthly Budget Plans - Kanban Style */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Budget Plans</h3>

                {activePlans.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activePlans.map((plan) => (
                            <div key={plan.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                {/* Card Header */}
                                <div className="p-4 border-b border-gray-200">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-semibold text-gray-900 text-lg">{plan.name}</h4>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(plan.status)}`}>
                                            {plan.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        {new Date(plan.start_date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })} - {new Date(plan.end_date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </p>
                                </div>

                                {/* Budget Overview */}
                                <div className="p-4">
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <p className="text-xs text-gray-600 mb-1">Budget</p>
                                            <p className="text-lg font-bold text-blue-600">
                                                ₹{parseFloat(plan.total_amount).toLocaleString('en-IN')}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600 mb-1">Spent</p>
                                            <p className="text-lg font-bold text-red-600">
                                                ₹{parseFloat(plan.spent_amount).toLocaleString('en-IN')}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs text-gray-600">Progress</span>
                                            <span className="text-xs font-semibold text-gray-900">{plan.progress_percentage}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div
                                                className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(plan.progress_percentage)}`}
                                                style={{ width: `${Math.min(plan.progress_percentage, 100)}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <p className="text-xs text-gray-600 mb-1">Remaining</p>
                                        <p className="text-xl font-bold text-green-600">
                                            ₹{parseFloat(plan.remaining_amount).toLocaleString('en-IN')}
                                        </p>
                                    </div>

                                    {/* Category Breakdown */}
                                    {plan.allocations && plan.allocations.length > 0 && (
                                        <div className="border-t border-gray-200 pt-3">
                                            <p className="text-xs text-gray-600 mb-2">Categories ({plan.allocations.length})</p>
                                            <div className="space-y-2">
                                                {plan.allocations.slice(0, 3).map((alloc) => (
                                                    <div key={alloc.id} className="flex items-center justify-between text-xs">
                                                        <div className="flex items-center gap-2">
                                                            <div
                                                                className="w-2 h-2 rounded-full"
                                                                style={{ backgroundColor: alloc.budget_category?.color || '#3b82f6' }}
                                                            />
                                                            <span className="text-gray-700">{alloc.budget_category?.name}</span>
                                                        </div>
                                                        <span className="text-gray-600">
                                                            ₹{parseFloat(alloc.allocated_amount).toLocaleString('en-IN')}
                                                        </span>
                                                    </div>
                                                ))}
                                                {plan.allocations.length > 3 && (
                                                    <p className="text-xs text-gray-500">+{plan.allocations.length - 3} more</p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Card Footer */}
                                <div className="p-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                                    <span className="text-xs text-gray-600">{plan.entries_count || 0} entries</span>
                                    <Link
                                        href={`/budget/plans/${plan.id}`}
                                        className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                                    >
                                        View Details →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow p-12 text-center">
                        <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Budgets</h3>
                        <p className="text-gray-600 mb-4">Create your first budget plan to start tracking your spending</p>
                        <Link
                            href="/budget/plans/create"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium"
                        >
                            <Plus className="w-4 h-4" />
                            Create Budget Plan
                        </Link>
                    </div>
                )}
            </div>
        </BudgetLayout>
    );
}
