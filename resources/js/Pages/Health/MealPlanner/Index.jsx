import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import { format, startOfWeek, addDays, subDays } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus, Trash2, Sparkles, Loader2 } from 'lucide-react';
import axios from 'axios';

export default function MealPlannerIndex({ auth, date, mealPlans, dailyTotals, dailyGoal }) {
    const [currentDate, setCurrentDate] = useState(new Date(date));
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [suggestions, setSuggestions] = useState(null);
    const [selectedMealType, setSelectedMealType] = useState(null);
    const [dietPreference, setDietPreference] = useState('balanced');

    const handleDateChange = (days) => {
        const newDate = addDays(currentDate, days);
        setCurrentDate(newDate);
        router.visit(route('health.meal-planner.index', { date: format(newDate, 'yyyy-MM-dd') }));
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to remove this meal?')) {
            router.delete(route('health.meal-planner.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    const handleSuggest = async (mealType) => {
        setIsSuggesting(true);
        setSelectedMealType(mealType);
        setSuggestions(null);
        try {
            const response = await axios.post(route('health.meal-planner.suggest'), {
                date: format(currentDate, 'yyyy-MM-dd'),
                meal_type: mealType.toLowerCase(),
                preference: dietPreference, // Send preference
            });
            setSuggestions(response.data);
        } catch (error) {
            console.error('Failed to get suggestions', error);
        } finally {
            setIsSuggesting(false);
        }
    };

    const addSuggestion = (foodItem) => {
        router.post(route('health.meal-planner.store'), {
            date: format(currentDate, 'yyyy-MM-dd'),
            meal_type: selectedMealType.toLowerCase(),
            food_item_id: foodItem.id,
            serving_amount: 1, // Default to 1 serving
        }, {
            onSuccess: () => setSuggestions(null),
        });
    };

    const renderSummaryBar = () => {
        if (!dailyGoal) return null;

        const getPercent = (current, target) => Math.min(100, (current / target) * 100);

        return (
            <div className="bg-white rounded-lg shadow p-4 mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Daily Nutrition Progress</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Calories */}
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="font-medium">Calories</span>
                            <span className="text-gray-500">{Math.round(dailyTotals.calories)} / {Math.round(dailyGoal.calories)} kcal</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${getPercent(dailyTotals.calories, dailyGoal.calories)}%` }}></div>
                        </div>
                    </div>
                    {/* Protein */}
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="font-medium">Protein</span>
                            <span className="text-gray-500">{Math.round(dailyTotals.protein)} / {Math.round(dailyGoal.protein)} g</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${getPercent(dailyTotals.protein, dailyGoal.protein)}%` }}></div>
                        </div>
                    </div>
                    {/* Carbs */}
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="font-medium">Carbs</span>
                            <span className="text-gray-500">{Math.round(dailyTotals.carbs)} / {Math.round(dailyGoal.carbs)} g</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${getPercent(dailyTotals.carbs, dailyGoal.carbs)}%` }}></div>
                        </div>
                    </div>
                    {/* Fats */}
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="font-medium">Fats</span>
                            <span className="text-gray-500">{Math.round(dailyTotals.fats)} / {Math.round(dailyGoal.fats)} g</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `${getPercent(dailyTotals.fats, dailyGoal.fats)}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderMealSection = (title, type) => {
        const plans = mealPlans[type.toLowerCase()] || [];
        const totalCals = plans.reduce((acc, plan) => acc + parseFloat(plan.calories), 0);

        return (
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold capitalize text-gray-800 flex items-center gap-2">
                        {title}
                        <span className="text-sm font-normal text-gray-500">
                            ({Math.round(totalCals)} kcal)
                        </span>
                    </h3>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleSuggest(type)}
                            className="text-xs flex items-center gap-1 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full hover:bg-indigo-100 transition-colors"
                        >
                            <Sparkles className="w-3 h-3" />
                            Suggest
                        </button>
                        {/* 
                            Eventually stick a manual "Add" button here too 
                            <button className="text-gray-400 hover:text-gray-600">
                                <Plus className="w-5 h-5" />
                            </button>
                        */}
                    </div>
                </div>

                {plans.length > 0 ? (
                    <div className="space-y-3">
                        {plans.map((plan) => (
                            <div key={plan.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-md border border-gray-100">
                                <div>
                                    <div className="font-medium text-gray-900">{plan.food_item.name}</div>
                                    <div className="text-xs text-gray-500">
                                        {plan.serving_amount} {plan.food_item.serving_unit} • {Math.round(plan.calories)} kcal
                                        • P: {Math.round(plan.protein)}g C: {Math.round(plan.carbs)}g F: {Math.round(plan.fats)}g
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(plan.id)}
                                    className="text-red-400 hover:text-red-600 p-1"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-6 border-2 border-dashed border-gray-100 rounded-lg text-gray-400 text-sm">
                        No meals planned yet.
                    </div>
                )}
            </div>
        );
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Meal Planner</h2>}>
            <Head title="Meal Planner" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Date Navigation */}
                    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow mb-6">
                        <button onClick={() => handleDateChange(-1)} className="p-2 hover:bg-gray-100 rounded-full">
                            <ChevronLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <div className="text-lg font-bold text-gray-800">
                            {format(currentDate, 'EEEE, MMMM do, yyyy')}
                        </div>
                        <button onClick={() => handleDateChange(1)} className="p-2 hover:bg-gray-100 rounded-full">
                            <ChevronRight className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>

                    {renderSummaryBar()}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {renderMealSection('Breakfast', 'Breakfast')}
                        {renderMealSection('Lunch', 'Lunch')}
                        {renderMealSection('Dinner', 'Dinner')}
                        {renderMealSection('Snacks', 'Snack')}
                    </div>
                </div>
            </div>

            {/* Suggestion Modal */}
            {suggestions && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setSuggestions(null)}></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">
                                    Suggested for {selectedMealType}
                                </h3>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Options
                                    </label>
                                    <select
                                        value={dietPreference}
                                        onChange={(e) => {
                                            setDietPreference(e.target.value);
                                            // Re-fetch suggestions with new preference
                                            setIsSuggesting(true);
                                            axios.post(route('health.meal-planner.suggest'), {
                                                date: format(currentDate, 'yyyy-MM-dd'),
                                                meal_type: selectedMealType.toLowerCase(),
                                                preference: e.target.value,
                                            }).then(res => {
                                                setSuggestions(res.data);
                                            }).finally(() => setIsSuggesting(false));
                                        }}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    >
                                        <option value="balanced">Balanced (Random)</option>
                                        <option value="high_protein">High Protein</option>
                                        <option value="low_carb">Low Carb</option>
                                        <option value="low_fat">Low Fat</option>
                                    </select>
                                </div>

                                <p className="text-sm text-gray-500 mb-4">
                                    Target: ~{suggestions.target_calories} kcal
                                </p>

                                <div className="space-y-2">
                                    {suggestions.suggestions.map((item) => (
                                        <div key={item.id} className="flex justify-between items-center p-3 border rounded hover:bg-gray-50 cursor-pointer" onClick={() => addSuggestion(item)}>
                                            <div>
                                                <div className="font-medium text-gray-900">{item.name}</div>
                                                <div className="text-xs text-gray-500">
                                                    {item.calories} kcal • {item.serving_size} {item.serving_unit}
                                                </div>
                                            </div>
                                            <Plus className="w-4 h-4 text-indigo-600" />
                                        </div>
                                    ))}
                                    {suggestions.suggestions.length === 0 && (
                                        <p className="text-gray-500 text-sm">No specific suggestions found.</p>
                                    )}
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    onClick={() => setSuggestions(null)}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Loading Overlay */}
            {isSuggesting && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
                    <div className="flex flex-col items-center">
                        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-2" />
                        <span className="text-indigo-600 font-medium">Finding healthy options...</span>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
