import BudgetLayout from '@/Layouts/BudgetLayout';
import { Head, Link } from '@inertiajs/react';
import { Plus, Eye, Edit, Trash2, Calendar, TrendingUp } from 'lucide-react';

export default function PlansIndex({ plans }) {
    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'completed': return 'bg-blue-100 text-blue-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <BudgetLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Budget Plans
                    </h2>
                    <Link
                        href="/budget/plans/create"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        New Plan
                    </Link>
                </div>
            }
        >
            <Head title="Budget Plans" />

            <div className="grid grid-cols-1 gap-6">
                {plans.length > 0 ? (
                    plans.map((plan) => (
                        <div key={plan.id} className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            <Calendar className="w-4 h-4 inline mr-1" />
                                            {new Date(plan.start_date).toLocaleDateString('en-IN')} - {new Date(plan.end_date).toLocaleDateString('en-IN')}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(plan.status)}`}>
                                            {plan.status}
                                        </span>
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                            {plan.budget_type}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Total Budget</p>
                                        <p className="text-xl font-bold text-gray-900">₹{parseFloat(plan.total_amount).toLocaleString('en-IN')}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Spent</p>
                                        <p className="text-xl font-bold text-red-600">₹{parseFloat(plan.spent_amount).toLocaleString('en-IN')}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Remaining</p>
                                        <p className="text-xl font-bold text-green-600">₹{parseFloat(plan.remaining_amount).toLocaleString('en-IN')}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Progress</p>
                                        <p className="text-xl font-bold text-purple-600">{plan.progress_percentage}%</p>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className={`h-3 rounded-full transition-all duration-300 ${plan.progress_percentage > 90 ? 'bg-red-600' :
                                                plan.progress_percentage > 75 ? 'bg-yellow-600' : 'bg-green-600'
                                                }`}
                                            style={{ width: `${Math.min(plan.progress_percentage, 100)}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-gray-600">
                                        {plan.entries_count} entries • {plan.allocations.length} categories
                                    </p>
                                    <div className="flex gap-2">
                                        <Link
                                            href={`/budget/plans/${plan.id}`}
                                            className="px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium flex items-center gap-1"
                                        >
                                            <Eye className="w-4 h-4" />
                                            View
                                        </Link>
                                        <Link
                                            href={`/budget/plans/${plan.id}/edit`}
                                            className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm font-medium flex items-center gap-1"
                                        >
                                            <Edit className="w-4 h-4" />
                                            Edit
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-white rounded-lg shadow p-12 text-center">
                        <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Budget Plans Yet</h3>
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
