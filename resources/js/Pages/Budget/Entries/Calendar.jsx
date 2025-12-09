import BudgetLayout from '@/Layouts/BudgetLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export default function EntriesCalendar({ entries, currentMonth, categories, plans }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [month, setMonth] = useState(currentMonth);

    const { data, setData, post, processing, reset } = useForm({
        budget_plan_id: '',
        budget_category_id: '',
        entry_date: '',
        amount: '',
        description: '',
        payment_method: 'cash',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/budget/entries', {
            onSuccess: () => {
                reset();
                setSelectedDate(null);
            },
        });
    };

    const getDaysInMonth = () => {
        const [year, monthNum] = month.split('-');
        const date = new Date(year, monthNum - 1, 1);
        const days = [];
        const firstDay = date.getDay();
        const daysInMonth = new Date(year, monthNum, 0).getDate();

        // Add empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            days.push(null);
        }

        // Add days of month
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(day);
        }

        return days;
    };

    const getEntriesForDate = (day) => {
        if (!day) return [];
        const dateStr = `${month}-${String(day).padStart(2, '0')}`;
        return entries[dateStr] || [];
    };

    const getTotalForDate = (day) => {
        const dayEntries = getEntriesForDate(day);
        return dayEntries.reduce((sum, entry) => sum + parseFloat(entry.amount), 0);
    };

    const changeMonth = (delta) => {
        const [year, monthNum] = month.split('-');
        const newDate = new Date(year, monthNum - 1 + delta, 1);
        const newMonth = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}`;
        window.location.href = `/budget/entries/calendar?month=${newMonth}`;
    };

    const days = getDaysInMonth();
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <BudgetLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Daily Entries Calendar
                </h2>
            }
        >
            <Head title="Budget Calendar" />

            <div className="bg-white rounded-lg shadow p-6">
                {/* Month Navigation */}
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={() => changeMonth(-1)}
                        className="p-2 hover:bg-gray-100 rounded-md"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <h3 className="text-lg font-semibold text-gray-900">
                        {new Date(month + '-01').toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                    </h3>
                    <button
                        onClick={() => changeMonth(1)}
                        className="p-2 hover:bg-gray-100 rounded-md"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                    {/* Week day headers */}
                    {weekDays.map((day) => (
                        <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                            {day}
                        </div>
                    ))}

                    {/* Calendar days */}
                    {days.map((day, index) => {
                        const dayEntries = getEntriesForDate(day);
                        const total = getTotalForDate(day);
                        const dateStr = day ? `${month}-${String(day).padStart(2, '0')}` : null;
                        const isToday = dateStr === new Date().toISOString().split('T')[0];

                        return (
                            <div
                                key={index}
                                className={`min-h-24 border rounded-lg p-2 ${day ? 'cursor-pointer hover:bg-gray-50' : 'bg-gray-50'
                                    } ${isToday ? 'border-indigo-500 border-2' : 'border-gray-200'}`}
                                onClick={() => {
                                    if (day) {
                                        setSelectedDate(dateStr);
                                        setData('entry_date', dateStr);
                                    }
                                }}
                            >
                                {day && (
                                    <>
                                        <div className="text-sm font-medium text-gray-900 mb-1">{day}</div>
                                        {dayEntries.length > 0 && (
                                            <>
                                                <div className="text-xs font-semibold text-red-600 mb-1">
                                                    -₹{total.toLocaleString('en-IN')}
                                                </div>
                                                <div className="space-y-0.5">
                                                    {dayEntries.slice(0, 2).map((entry) => (
                                                        <div
                                                            key={entry.id}
                                                            className="text-xs truncate"
                                                            style={{ color: entry.budget_category.color }}
                                                        >
                                                            • {entry.budget_category.name}
                                                        </div>
                                                    ))}
                                                    {dayEntries.length > 2 && (
                                                        <div className="text-xs text-gray-500">
                                                            +{dayEntries.length - 2} more
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Entry Form Modal */}
            {selectedDate && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Add Entry for {new Date(selectedDate).toLocaleDateString('en-IN')}
                            </h3>
                            <button
                                onClick={() => setSelectedDate(null)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Budget Plan</label>
                                <select
                                    value={data.budget_plan_id}
                                    onChange={(e) => setData('budget_plan_id', e.target.value)}
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">None</option>
                                    {plans.map((plan) => (
                                        <option key={plan.id} value={plan.id}>{plan.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Amount *</label>
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
                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium disabled:opacity-50"
                                >
                                    Add Entry
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSelectedDate(null)}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 font-medium"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>

                        {/* Existing entries for this date */}
                        {getEntriesForDate(new Date(selectedDate).getDate()).length > 0 && (
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <h4 className="text-sm font-semibold text-gray-900 mb-3">Entries for this day:</h4>
                                <div className="space-y-2">
                                    {getEntriesForDate(new Date(selectedDate).getDate()).map((entry) => (
                                        <div key={entry.id} className="flex justify-between items-center text-sm">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="w-2 h-2 rounded-full"
                                                    style={{ backgroundColor: entry.budget_category.color }}
                                                />
                                                <span className="text-gray-900">{entry.budget_category.name}</span>
                                            </div>
                                            <span className="font-semibold text-red-600">
                                                -₹{parseFloat(entry.amount).toLocaleString('en-IN')}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </BudgetLayout>
    );
}
