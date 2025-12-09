import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Search, Filter, Trash2 } from 'lucide-react';

export default function TodoList({ auth, todos, categories, filters }) {
    const [selectedTodos, setSelectedTodos] = useState([]);
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [filterData, setFilterData] = useState({
        category_id: filters.category_id || '',
        priority: filters.priority || '',
        status: filters.status || '',
        sort_by: filters.sort_by || 'due_date',
        sort_order: filters.sort_order || 'asc',
    });

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filterData, [key]: value, search: searchQuery };
        setFilterData({ ...filterData, [key]: value });
        router.get('/todos/list', newFilters, { preserveState: true, replace: true });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/todos/list', { ...filterData, search: searchQuery }, { preserveState: true, replace: true });
    };

    const handleToggleComplete = (todoId, isCompleted) => {
        fetch(`/todos/${todoId}/toggle`, {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                'Content-Type': 'application/json',
            },
        }).then(() => window.location.reload());
    };

    const handleBulkDelete = () => {
        if (selectedTodos.length === 0) return;
        if (!confirm(`Delete ${selectedTodos.length} selected todos?`)) return;

        fetch('/todos/bulk-delete', {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ todo_ids: selectedTodos }),
        }).then(() => {
            setSelectedTodos([]);
            window.location.reload();
        });
    };

    const toggleSelectAll = () => {
        if (selectedTodos.length === todos.data.length) {
            setSelectedTodos([]);
        } else {
            setSelectedTodos(todos.data.map(t => t.id));
        }
    };

    const toggleSelect = (todoId) => {
        if (selectedTodos.includes(todoId)) {
            setSelectedTodos(selectedTodos.filter(id => id !== todoId));
        } else {
            setSelectedTodos([...selectedTodos, todoId]);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Todo List
                    </h2>
                    <Link
                        href="/todos"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium"
                    >
                        Dashboard
                    </Link>
                </div>
            }
        >
            <Head title="Todo List" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Filters and Search */}
                    <div className="bg-white rounded-lg shadow p-4 mb-6">
                        <div className="flex flex-wrap gap-4 items-end">
                            {/* Search */}
                            <form onSubmit={handleSearch} className="flex-1 min-w-[200px]">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search todos..."
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md pr-10"
                                        />
                                        <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
                                    </div>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                    >
                                        Search
                                    </button>
                                </div>
                            </form>

                            {/* Category Filter */}
                            <div className="min-w-[150px]">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select
                                    value={filterData.category_id}
                                    onChange={(e) => handleFilterChange('category_id', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">All Categories</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Priority Filter */}
                            <div className="min-w-[150px]">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                                <select
                                    value={filterData.priority}
                                    onChange={(e) => handleFilterChange('priority', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">All Priorities</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>

                            {/* Status Filter */}
                            <div className="min-w-[150px]">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    value={filterData.status}
                                    onChange={(e) => handleFilterChange('status', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                    <option value="overdue">Overdue</option>
                                </select>
                            </div>

                            {/* Sort */}
                            <div className="min-w-[150px]">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                                <select
                                    value={filterData.sort_by}
                                    onChange={(e) => handleFilterChange('sort_by', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                >
                                    <option value="due_date">Due Date</option>
                                    <option value="priority">Priority</option>
                                    <option value="created_at">Created Date</option>
                                    <option value="title">Title</option>
                                </select>
                            </div>
                        </div>

                        {/* Bulk Actions */}
                        {selectedTodos.length > 0 && (
                            <div className="mt-4 flex items-center gap-4 p-3 bg-indigo-50 rounded-md">
                                <span className="text-sm font-medium text-indigo-900">
                                    {selectedTodos.length} selected
                                </span>
                                <button
                                    onClick={handleBulkDelete}
                                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm flex items-center gap-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Delete Selected
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Todos Table */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left">
                                        <input
                                            type="checkbox"
                                            checked={selectedTodos.length === todos.data.length && todos.data.length > 0}
                                            onChange={toggleSelectAll}
                                            className="h-4 w-4 rounded border-gray-300"
                                        />
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Done</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {todos.data.length > 0 ? (
                                    todos.data.map(todo => (
                                        <tr key={todo.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedTodos.includes(todo.id)}
                                                    onChange={() => toggleSelect(todo.id)}
                                                    className="h-4 w-4 rounded border-gray-300"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <input
                                                    type="checkbox"
                                                    checked={todo.is_completed}
                                                    onChange={() => handleToggleComplete(todo.id, todo.is_completed)}
                                                    className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className={`font-medium ${todo.is_completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                                                    {todo.title}
                                                </p>
                                                {todo.description && (
                                                    <p className="text-sm text-gray-500 mt-1">{todo.description}</p>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {todo.category ? (
                                                    <span
                                                        className="px-2 py-1 text-xs rounded-full"
                                                        style={{ backgroundColor: todo.category.color + '20', color: todo.category.color }}
                                                    >
                                                        {todo.category.name}
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-400 text-sm">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 text-xs rounded-full ${todo.priority === 'high' ? 'bg-red-100 text-red-700' :
                                                        todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-green-100 text-green-700'
                                                    }`}>
                                                    {todo.priority}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {todo.due_date ? new Date(todo.due_date).toLocaleDateString() : '-'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 text-xs rounded-full ${todo.is_completed ? 'bg-green-100 text-green-700' :
                                                        todo.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                                                            'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {todo.is_completed ? 'Completed' : todo.status.replace('_', ' ')}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                                            No todos found. Try adjusting your filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        {todos.links && (
                            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm text-gray-700">
                                        Showing {todos.from} to {todos.to} of {todos.total} results
                                    </div>
                                    <div className="flex gap-2">
                                        {todos.links.map((link, index) => (
                                            <a
                                                key={index}
                                                href={link.url}
                                                className={`px-3 py-1 rounded ${link.active
                                                        ? 'bg-indigo-600 text-white'
                                                        : 'bg-white text-gray-700 hover:bg-gray-50 border'
                                                    } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
