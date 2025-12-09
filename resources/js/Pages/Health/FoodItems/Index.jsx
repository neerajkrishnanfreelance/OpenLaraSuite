import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, X, Edit2, Trash2, Search } from 'lucide-react';

export default function FoodItemsIndex({ auth, foodItems, filters }) {
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [searchQuery, setSearchQuery] = useState(filters.search || '');

    const { data, setData, post, put, processing, reset } = useForm({
        name: '',
        brand: '',
        serving_size: '',
        serving_unit: 'g',
        calories: '',
        protein: '',
        carbs: '',
        fats: '',
        fiber: '',
        sugar: '',
        sodium: '',
        category: 'other',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingItem) {
            put(`/health/food-items/${editingItem.id}`, {
                onSuccess: () => {
                    setShowAddModal(false);
                    setEditingItem(null);
                    reset();
                }
            });
        } else {
            post('/health/food-items', {
                onSuccess: () => {
                    setShowAddModal(false);
                    reset();
                }
            });
        }
    };

    const handleDelete = (itemId) => {
        if (confirm('Are you sure you want to delete this food item?')) {
            router.delete(`/health/food-items/${itemId}`);
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setData({
            name: item.name,
            brand: item.brand || '',
            serving_size: item.serving_size,
            serving_unit: item.serving_unit,
            calories: item.calories,
            protein: item.protein,
            carbs: item.carbs,
            fats: item.fats,
            fiber: item.fiber,
            sugar: item.sugar,
            sodium: item.sodium,
            category: item.category || 'other',
        });
        setShowAddModal(true);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/health/food-items', { search: searchQuery }, { preserveState: true });
    };

    const categories = [
        'fruits', 'vegetables', 'protein', 'grains', 'dairy', 'snacks', 'beverages', 'other'
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Food Database</h2>
                    <button
                        onClick={() => {
                            setEditingItem(null);
                            reset();
                            setShowAddModal(true);
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add Food Item
                    </button>
                </div>
            }
        >
            <Head title="Food Database" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Search Bar */}
                    <div className="bg-white rounded-lg shadow p-4 mb-6">
                        <form onSubmit={handleSearch} className="flex gap-2">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search food items..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10"
                                />
                                <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
                            </div>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            >
                                Search
                            </button>
                        </form>
                    </div>

                    {/* Food Items Table */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Food Item
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Serving
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Calories
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Protein
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Carbs
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Fats
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {foodItems.data.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                                {item.brand && (
                                                    <div className="text-sm text-gray-500">{item.brand}</div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {item.serving_size}{item.serving_unit}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {Math.round(item.calories)} kcal
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {Math.round(item.protein)}g
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {Math.round(item.carbs)}g
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {Math.round(item.fats)}g
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full capitalize">
                                                {item.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="text-blue-600 hover:text-blue-900 mr-3"
                                            >
                                                <Edit2 className="w-4 h-4 inline" />
                                            </button>
                                            {item.is_custom && (
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    <Trash2 className="w-4 h-4 inline" />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        {foodItems.links && (
                            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm text-gray-700">
                                        Showing {foodItems.from} to {foodItems.to} of {foodItems.total} results
                                    </div>
                                    <div className="flex gap-2">
                                        {foodItems.links.map((link, index) => (
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

            {/* Add/Edit Food Item Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">
                                {editingItem ? 'Edit Food Item' : 'Add Food Item'}
                            </h3>
                            <button onClick={() => {
                                setShowAddModal(false);
                                setEditingItem(null);
                                reset();
                            }}>
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Brand
                                    </label>
                                    <input
                                        type="text"
                                        value={data.brand}
                                        onChange={(e) => setData('brand', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Serving Size *
                                    </label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        value={data.serving_size}
                                        onChange={(e) => setData('serving_size', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Unit *
                                    </label>
                                    <select
                                        value={data.serving_unit}
                                        onChange={(e) => setData('serving_unit', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        required
                                    >
                                        <option value="g">grams (g)</option>
                                        <option value="ml">milliliters (ml)</option>
                                        <option value="cup">cup</option>
                                        <option value="tbsp">tablespoon</option>
                                        <option value="tsp">teaspoon</option>
                                        <option value="piece">piece</option>
                                        <option value="slice">slice</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Category
                                    </label>
                                    <select
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md capitalize"
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat} className="capitalize">
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <h4 className="text-sm font-semibold text-gray-900 mb-3">Nutrition Information (per serving)</h4>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Calories (kcal) *
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            value={data.calories}
                                            onChange={(e) => setData('calories', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Protein (g)
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            value={data.protein}
                                            onChange={(e) => setData('protein', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Carbs (g)
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            value={data.carbs}
                                            onChange={(e) => setData('carbs', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Fats (g)
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            value={data.fats}
                                            onChange={(e) => setData('fats', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Fiber (g)
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            value={data.fiber}
                                            onChange={(e) => setData('fiber', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Sugar (g)
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            value={data.sugar}
                                            onChange={(e) => setData('sugar', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2 pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-300"
                                >
                                    {editingItem ? 'Update' : 'Add Food Item'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddModal(false);
                                        setEditingItem(null);
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
