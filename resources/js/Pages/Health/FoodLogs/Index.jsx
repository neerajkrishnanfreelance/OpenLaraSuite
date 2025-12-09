import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import { Search, Plus, X, Edit2, Trash2 } from 'lucide-react';

export default function FoodLogsIndex({ auth, foodLogs, dailyTotals, currentDate }) {
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedMealType, setSelectedMealType] = useState('breakfast');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [editingLog, setEditingLog] = useState(null);

    const { data, setData, post, put, processing, reset } = useForm({
        food_item_id: '',
        meal_type: 'breakfast',
        servings: 1,
        consumed_at: new Date().toISOString().slice(0, 16),
        notes: '',
    });

    const searchFood = async (query) => {
        if (query.length < 2) {
            setSearchResults([]);
            return;
        }

        try {
            const response = await fetch(`/health/food-items/search?q=${encodeURIComponent(query)}`);
            const results = await response.json();
            setSearchResults(results);
        } catch (error) {
            console.error('Search error:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingLog) {
            put(`/health/food-logs/${editingLog.id}`, {
                onSuccess: () => {
                    setShowAddModal(false);
                    setEditingLog(null);
                    reset();
                }
            });
        } else {
            post('/health/food-logs', {
                onSuccess: () => {
                    setShowAddModal(false);
                    reset();
                    setSearchResults([]);
                }
            });
        }
    };

    const handleDelete = (logId) => {
        if (confirm('Are you sure you want to delete this food log?')) {
            router.delete(`/health/food-logs/${logId}`);
        }
    };

    const handleEdit = (log) => {
        setEditingLog(log);
        setData({
            food_item_id: log.food_item_id,
            meal_type: log.meal_type,
            servings: log.servings,
            consumed_at: new Date(log.consumed_at).toISOString().slice(0, 16),
            notes: log.notes || '',
        });
        setShowAddModal(true);
    };

    const selectFoodItem = (foodItem) => {
        setData('food_item_id', foodItem.id);
        setSearchQuery(foodItem.name);
        setSearchResults([]);
    };

    const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Food Logs</h2>
                    <button
                        onClick={() => {
                            setEditingLog(null);
                            reset();
                            setShowAddModal(true);
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Log Food
                    </button>
                </div>
            }
        >
            <Head title="Food Logs" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Daily Summary */}
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Nutrition Summary</h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-red-600">{Math.round(dailyTotals.calories)}</p>
                                <p className="text-sm text-gray-600">Calories</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-blue-600">{Math.round(dailyTotals.protein)}g</p>
                                <p className="text-sm text-gray-600">Protein</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-green-600">{Math.round(dailyTotals.carbs)}g</p>
                                <p className="text-sm text-gray-600">Carbs</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-yellow-600">{Math.round(dailyTotals.fats)}g</p>
                                <p className="text-sm text-gray-600">Fats</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-purple-600">{Math.round(dailyTotals.fiber)}g</p>
                                <p className="text-sm text-gray-600">Fiber</p>
                            </div>
                        </div>
                    </div>

                    {/* Meal Type Tabs */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="border-b border-gray-200">
                            <nav className="flex -mb-px">
                                {mealTypes.map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setSelectedMealType(type)}
                                        className={`px-6 py-3 text-sm font-medium capitalize ${selectedMealType === type
                                                ? 'border-b-2 border-indigo-600 text-indigo-600'
                                                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <div className="p-6">
                            {foodLogs[selectedMealType]?.length > 0 ? (
                                <div className="space-y-4">
                                    {foodLogs[selectedMealType].map((log) => (
                                        <div key={log.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900">{log.food_item.name}</h4>
                                                <p className="text-sm text-gray-600">
                                                    {log.servings} × {log.food_item.serving_size}{log.food_item.serving_unit}
                                                </p>
                                                {log.notes && <p className="text-sm text-gray-500 mt-1">{log.notes}</p>}
                                            </div>
                                            <div className="text-right mr-4">
                                                <p className="font-semibold text-gray-900">{Math.round(log.total_calories)} kcal</p>
                                                <p className="text-sm text-gray-600">
                                                    P: {Math.round(log.total_protein)}g | C: {Math.round(log.total_carbs)}g | F: {Math.round(log.total_fats)}g
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(log)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(log.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 text-gray-500">
                                    No food logged for {selectedMealType} yet.
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* Add/Edit Food Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">
                                {editingLog ? 'Edit Food Log' : 'Log Food'}
                            </h3>
                            <button onClick={() => {
                                setShowAddModal(false);
                                setEditingLog(null);
                                reset();
                            }}>
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Food Search */}
                            {!editingLog && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Search Food
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => {
                                                setSearchQuery(e.target.value);
                                                searchFood(e.target.value);
                                            }}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            placeholder="Search for food..."
                                        />
                                        <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
                                    </div>
                                    {searchResults.length > 0 && (
                                        <div className="mt-2 max-h-48 overflow-y-auto border border-gray-200 rounded-md">
                                            {searchResults.map((item) => (
                                                <button
                                                    key={item.id}
                                                    type="button"
                                                    onClick={() => selectFoodItem(item)}
                                                    className="w-full text-left px-3 py-2 hover:bg-gray-50 border-b border-gray-100"
                                                >
                                                    <p className="font-medium">{item.name}</p>
                                                    <p className="text-sm text-gray-600">
                                                        {item.calories} kcal per {item.serving_size}{item.serving_unit}
                                                    </p>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Meal Type
                                </label>
                                <select
                                    value={data.meal_type}
                                    onChange={(e) => setData('meal_type', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                >
                                    {mealTypes.map((type) => (
                                        <option key={type} value={type} className="capitalize">
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Servings
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    min="0.1"
                                    value={data.servings}
                                    onChange={(e) => setData('servings', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Time
                                </label>
                                <input
                                    type="datetime-local"
                                    value={data.consumed_at}
                                    onChange={(e) => setData('consumed_at', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Notes (Optional)
                                </label>
                                <textarea
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    rows="2"
                                />
                            </div>

                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    disabled={processing || (!editingLog && !data.food_item_id)}
                                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-300"
                                >
                                    {editingLog ? 'Update' : 'Log Food'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddModal(false);
                                        setEditingLog(null);
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
