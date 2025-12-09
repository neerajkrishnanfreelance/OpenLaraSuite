import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, X, Edit2, Trash2, Tag } from 'lucide-react';

export default function TodoCategories({ auth, categories }) {
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    const { data, setData, post, put, processing, reset } = useForm({
        name: '',
        color: '#3b82f6',
        icon: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingCategory) {
            put(`/todos/categories/${editingCategory.id}`, {
                onSuccess: () => {
                    setShowModal(false);
                    setEditingCategory(null);
                    reset();
                }
            });
        } else {
            post('/todos/categories', {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                }
            });
        }
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setData({
            name: category.name,
            color: category.color,
            icon: category.icon || '',
        });
        setShowModal(true);
    };

    const handleDelete = (categoryId) => {
        if (confirm('Delete this category? Todos in this category will be uncategorized.')) {
            fetch(`/todos/categories/${categoryId}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
            }).then(() => window.location.reload());
        }
    };

    const predefinedColors = [
        '#3b82f6', // Blue
        '#ef4444', // Red
        '#10b981', // Green
        '#f59e0b', // Yellow
        '#8b5cf6', // Purple
        '#ec4899', // Pink
        '#06b6d4', // Cyan
        '#f97316', // Orange
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Todo Categories
                    </h2>
                    <button
                        onClick={() => {
                            setEditingCategory(null);
                            reset();
                            setShowModal(true);
                        }}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        New Category
                    </button>
                </div>
            }
        >
            <Head title="Todo Categories" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Categories Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.length > 0 ? (
                            categories.map(category => (
                                <div key={category.id} className="bg-white rounded-lg shadow p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-12 h-12 rounded-lg flex items-center justify-center"
                                                style={{ backgroundColor: category.color + '20' }}
                                            >
                                                <Tag className="w-6 h-6" style={{ color: category.color }} />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{category.name}</h3>
                                                <p className="text-sm text-gray-500">
                                                    {category.todos_count || 0} active todos
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(category)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(category.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-6 h-6 rounded border-2 border-gray-200"
                                            style={{ backgroundColor: category.color }}
                                        />
                                        <span className="text-sm text-gray-600">{category.color}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full bg-white rounded-lg shadow p-12 text-center">
                                <Tag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 mb-4">No categories yet</p>
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                >
                                    Create Your First Category
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">
                                {editingCategory ? 'Edit Category' : 'New Category'}
                            </h3>
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setEditingCategory(null);
                                    reset();
                                }}
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Category Name *
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    placeholder="e.g., Personal, Work, Shopping"
                                    required
                                />
                            </div>

                            {/* Color Picker */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Color *
                                </label>
                                <div className="grid grid-cols-4 gap-2 mb-3">
                                    {predefinedColors.map(color => (
                                        <button
                                            key={color}
                                            type="button"
                                            onClick={() => setData('color', color)}
                                            className={`w-full h-10 rounded-md border-2 ${data.color === color ? 'border-gray-900' : 'border-gray-200'
                                                }`}
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="color"
                                        value={data.color}
                                        onChange={(e) => setData('color', e.target.value)}
                                        className="h-10 w-20 rounded border border-gray-300"
                                    />
                                    <input
                                        type="text"
                                        value={data.color}
                                        onChange={(e) => setData('color', e.target.value)}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                                        placeholder="#3b82f6"
                                    />
                                </div>
                            </div>

                            {/* Preview */}
                            <div className="p-4 bg-gray-50 rounded-md">
                                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                                <span
                                    className="inline-block px-3 py-1 rounded-full text-sm font-medium"
                                    style={{ backgroundColor: data.color + '20', color: data.color }}
                                >
                                    {data.name || 'Category Name'}
                                </span>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-2 pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-300"
                                >
                                    {editingCategory ? 'Update' : 'Create'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false);
                                        setEditingCategory(null);
                                        reset();
                                    }}
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
