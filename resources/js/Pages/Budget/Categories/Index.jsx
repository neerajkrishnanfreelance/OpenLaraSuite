import BudgetLayout from '@/Layouts/BudgetLayout';
import { Head, useForm } from '@inertiajs/react';
import { Plus, Edit2, Trash2, Tag } from 'lucide-react';
import { useState } from 'react';

export default function CategoriesIndex({ categories }) {
    const [editingCategory, setEditingCategory] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        name: '',
        description: '',
        color: '#3B82F6',
        icon: 'DollarSign',
        is_active: true,
    });

    const handleCreate = (e) => {
        e.preventDefault();
        post('/budget/categories', {
            onSuccess: () => {
                reset();
                setShowCreateForm(false);
            },
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        put(`/budget/categories/${editingCategory.id}`, {
            onSuccess: () => {
                reset();
                setEditingCategory(null);
            },
        });
    };

    const handleDelete = (category) => {
        if (confirm(`Are you sure you want to delete "${category.name}"?`)) {
            destroy(`/budget/categories/${category.id}`);
        }
    };

    const startEdit = (category) => {
        setData({
            name: category.name,
            description: category.description || '',
            color: category.color,
            icon: category.icon,
            is_active: category.is_active,
        });
        setEditingCategory(category);
        setShowCreateForm(false);
    };

    const iconOptions = [
        'DollarSign', 'ShoppingCart', 'Home', 'Car', 'Utensils', 'Coffee',
        'Smartphone', 'Tv', 'Heart', 'Briefcase', 'GraduationCap', 'Plane',
        'Gift', 'Music', 'Film', 'Book', 'Zap', 'Droplet'
    ];

    const colorOptions = [
        '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
        '#EC4899', '#14B8A6', '#F97316', '#06B6D4', '#84CC16'
    ];

    return (
        <BudgetLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Budget Categories
                    </h2>
                    <button
                        onClick={() => {
                            setShowCreateForm(!showCreateForm);
                            setEditingCategory(null);
                            reset();
                        }}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium flex items-center gap-2"
                    >
                        New Category
                    </button>
                </div>
            }
        >
            <Head title="Budget Categories" />

            {/* Create/Edit Form */}
            {(showCreateForm || editingCategory) && (
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {editingCategory ? 'Edit Category' : 'Create Category'}
                    </h3>
                    <form onSubmit={editingCategory ? handleUpdate : handleCreate} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
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
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                                <div className="flex gap-2 flex-wrap">
                                    {colorOptions.map((color) => (
                                        <button
                                            key={color}
                                            type="button"
                                            onClick={() => setData('color', color)}
                                            className={`w-8 h-8 rounded-full border-2 ${data.color === color ? 'border-gray-900' : 'border-gray-300'
                                                }`}
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                                <select
                                    value={data.icon}
                                    onChange={(e) => setData('icon', e.target.value)}
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    {iconOptions.map((icon) => (
                                        <option key={icon} value={icon}>{icon}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={data.is_active}
                                onChange={(e) => setData('is_active', e.target.checked)}
                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label className="text-sm font-medium text-gray-700">Active</label>
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium disabled:opacity-50"
                            >
                                {editingCategory ? 'Update' : 'Create'}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setEditingCategory(null);
                                    setShowCreateForm(false);
                                    reset();
                                }}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 font-medium"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Categories List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">All Categories</h3>
                </div>
                <div className="divide-y divide-gray-200">
                    {categories.length > 0 ? (
                        categories.map((category) => (
                            <div key={category.id} className="p-4 hover:bg-gray-50 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                                        style={{ backgroundColor: category.color + '20' }}
                                    >
                                        <Tag className="w-6 h-6" style={{ color: category.color }} />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">{category.name}</h4>
                                        {category.description && (
                                            <p className="text-sm text-gray-600">{category.description}</p>
                                        )}
                                        <p className="text-xs text-gray-500 mt-1">
                                            {category.entries_count} entries
                                            {!category.is_active && ' • Inactive'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => startEdit(category)}
                                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-md"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(category)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                                        disabled={category.entries_count > 0}
                                        title={category.entries_count > 0 ? 'Cannot delete category with entries' : 'Delete category'}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            No categories yet. Create your first category to get started!
                        </div>
                    )}
                </div>
            </div>
        </BudgetLayout>
    );
}
