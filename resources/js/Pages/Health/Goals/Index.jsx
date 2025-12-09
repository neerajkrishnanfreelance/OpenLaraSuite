import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Target, TrendingUp } from 'lucide-react';

export default function GoalsIndex({ auth, healthGoal }) {
    const { data, setData, post, processing } = useForm({
        daily_calorie_target: healthGoal?.daily_calorie_target || '',
        daily_protein_target: healthGoal?.daily_protein_target || '',
        daily_carbs_target: healthGoal?.daily_carbs_target || '',
        daily_fats_target: healthGoal?.daily_fats_target || '',
        weekly_workout_target: healthGoal?.weekly_workout_target || 3,
        weekly_workout_minutes_target: healthGoal?.weekly_workout_minutes_target || '',
        current_weight: healthGoal?.current_weight || '',
        target_weight: healthGoal?.target_weight || '',
        weight_unit: healthGoal?.weight_unit || 'kg',
        daily_water_target: healthGoal?.daily_water_target || '',
        start_date: healthGoal?.start_date || new Date().toISOString().split('T')[0],
        target_date: healthGoal?.target_date || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/health/goals');
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Health Goals</h2>
            }
        >
            <Head title="Health Goals" />

            <div className="py-6">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Target className="w-8 h-8 text-indigo-600" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Set Your Health Goals</h3>
                                <p className="text-sm text-gray-600">Define your targets to track your progress effectively</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Nutrition Goals */}
                            <div>
                                <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                                    Daily Nutrition Targets
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Calories (kcal)
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={data.daily_calorie_target}
                                            onChange={(e) => setData('daily_calorie_target', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            placeholder="2000"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Protein (g)
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={data.daily_protein_target}
                                            onChange={(e) => setData('daily_protein_target', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            placeholder="150"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Carbs (g)
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={data.daily_carbs_target}
                                            onChange={(e) => setData('daily_carbs_target', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            placeholder="200"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Fats (g)
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={data.daily_fats_target}
                                            onChange={(e) => setData('daily_fats_target', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            placeholder="65"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Workout Goals */}
                            <div>
                                <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                    Weekly Workout Targets
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Workouts per Week
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={data.weekly_workout_target}
                                            onChange={(e) => setData('weekly_workout_target', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            placeholder="3"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Total Minutes per Week
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={data.weekly_workout_minutes_target}
                                            onChange={(e) => setData('weekly_workout_minutes_target', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            placeholder="150"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Weight Goals */}
                            <div>
                                <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                                    Weight Tracking
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Current Weight
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            value={data.current_weight}
                                            onChange={(e) => setData('current_weight', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            placeholder="70"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Target Weight
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            value={data.target_weight}
                                            onChange={(e) => setData('target_weight', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            placeholder="65"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Unit
                                        </label>
                                        <select
                                            value={data.weight_unit}
                                            onChange={(e) => setData('weight_unit', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        >
                                            <option value="kg">Kilograms (kg)</option>
                                            <option value="lbs">Pounds (lbs)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Other Goals */}
                            <div>
                                <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-cyan-600 rounded-full"></span>
                                    Other Targets
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Daily Water (liters)
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            value={data.daily_water_target}
                                            onChange={(e) => setData('daily_water_target', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            placeholder="2.5"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Timeline */}
                            <div>
                                <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                                    Timeline
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Start Date
                                        </label>
                                        <input
                                            type="date"
                                            value={data.start_date}
                                            onChange={(e) => setData('start_date', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Target Date
                                        </label>
                                        <input
                                            type="date"
                                            value={data.target_date}
                                            onChange={(e) => setData('target_date', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium disabled:bg-gray-300"
                                >
                                    {healthGoal ? 'Update Goals' : 'Set Goals'}
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
