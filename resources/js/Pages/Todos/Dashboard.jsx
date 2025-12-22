import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function TodoDashboard({
    auth,
    todayTodos,
    overdueTodos,
    upcomingTodos,
    stats,
    categories
}) {
    const [showQuickAdd, setShowQuickAdd] = useState(false);
    const { data, setData, post, processing, reset } = useForm({
        title: '',
        due_date: new Date().toISOString().split('T')[0],
        priority: 'medium',
    });

    const handleQuickAdd = (e) => {
        e.preventDefault();
        post('/todos', {
            onSuccess: () => {
                reset();
                setShowQuickAdd(false);
            }
        });
    };

    const StatCard = ({ icon: Icon, title, value, color }) => (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600 mb-1">{title}</p>
                    <p className="text-3xl font-bold text-gray-900">{value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-${color}-100`}>
                    <Icon className={`w-8 h-8 text-${color}-600`} />
                </div>
            </div>
        </div>
    );

    const TodoItem = ({ todo, showDate = false }) => (
        <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
            <input
                type="checkbox"
                checked={todo.is_completed}
                onChange={() => {
                    fetch(`/todos/${todo.id}/toggle`, {
                        method: 'POST',
                        headers: {
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                            'Content-Type': 'application/json',
                        },
                    }).then(() => window.location.reload());
                }}
                className="mt-1 h-5 w-5 rounded border-gray-300"
            />
            <div className="flex-1">
                <p className={`font-medium ${todo.is_completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                    {todo.title}
                </p>
                {showDate && todo.due_date && (
                    <p className="text-sm text-gray-500">
                        {new Date(todo.due_date).toLocaleDateString()}
                    </p>
                )}
                {todo.category && (
                    <span
                        className="inline-block mt-1 px-2 py-1 text-xs rounded-full"
                        style={{ backgroundColor: todo.category.color + '20', color: todo.category.color }}
                    >
                        {todo.category.name}
                    </span>
                )}
            </div>
            <span className={`px-2 py-1 text-xs rounded-full ${todo.priority === 'high' ? 'bg-red-100 text-red-700' :
                todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                }`}>
                {todo.priority}
            </span>
        </div>
    );

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Todo Dashboard
                    </h2>
                    <div className="flex gap-2">
                        <Link
                            href="/todos/calendar"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium"
                        >
                            Calendar View
                        </Link>
                        <Link
                            href="/todos/list"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
                        >
                            List View
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Todo Dashboard" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Quick Add */}
                    <div className="bg-white rounded-lg shadow p-4 mb-6">
                        {!showQuickAdd ? (
                            <button
                                onClick={() => setShowQuickAdd(true)}
                                className="w-full flex items-center gap-2 text-gray-600 hover:text-gray-900"
                            >
                                <span>Quick add a todo...</span>
                            </button>
                        ) : (
                            <form onSubmit={handleQuickAdd} className="flex gap-2">
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="What needs to be done?"
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                                    autoFocus
                                    required
                                />
                                <input
                                    type="date"
                                    value={data.due_date}
                                    onChange={(e) => setData('due_date', e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-md"
                                />
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                >
                                    Add
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowQuickAdd(false);
                                        reset();
                                    }}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <StatCard icon={CheckCircle2} title="Total Todos" value={stats.total} color="blue" />
                        <StatCard icon={CheckCircle2} title="Completed" value={stats.completed} color="green" />
                        <StatCard icon={Clock} title="Pending" value={stats.pending} color="yellow" />
                        <StatCard icon={AlertCircle} title="Completion Rate" value={`${stats.completion_rate}%`} color="purple" />
                    </div>

                    {/* Todos Sections */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Overdue */}
                        {overdueTodos.length > 0 && (
                            <div className="bg-white rounded-lg shadow">
                                <div className="p-4 border-b border-gray-200 bg-red-50">
                                    <h3 className="font-semibold text-red-900 flex items-center gap-2">
                                        <AlertCircle className="w-5 h-5" />
                                        Overdue ({overdueTodos.length})
                                    </h3>
                                </div>
                                <div className="p-4 space-y-2">
                                    {overdueTodos.map(todo => (
                                        <TodoItem key={todo.id} todo={todo} showDate />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Today */}
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-4 border-b border-gray-200">
                                <h3 className="font-semibold text-gray-900">Today ({todayTodos.length})</h3>
                            </div>
                            <div className="p-4 space-y-2">
                                {todayTodos.length > 0 ? (
                                    todayTodos.map(todo => (
                                        <TodoItem key={todo.id} todo={todo} />
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500 py-8">No todos for today</p>
                                )}
                            </div>
                        </div>

                        {/* Upcoming */}
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-4 border-b border-gray-200">
                                <h3 className="font-semibold text-gray-900">Upcoming ({upcomingTodos.length})</h3>
                            </div>
                            <div className="p-4 space-y-2">
                                {upcomingTodos.length > 0 ? (
                                    upcomingTodos.map(todo => (
                                        <TodoItem key={todo.id} todo={todo} showDate />
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500 py-8">No upcoming todos</p>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
