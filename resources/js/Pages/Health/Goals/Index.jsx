import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Target, TrendingUp, Calculator, X } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

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

    const [showCalculator, setShowCalculator] = useState(false);
    const [calcLoading, setCalcLoading] = useState(false);
    const [calcError, setCalcError] = useState(null);
    const [calculatedResults, setCalculatedResults] = useState(null);
    const [profileData, setProfileData] = useState({
        height: auth.user.height || '',
        weight: auth.user.weight || '',
        birth_date: auth.user.birth_date || '',
        gender: auth.user.gender || 'male',
        activity_level: auth.user.activity_level || 'moderate',
        goal_type: 'maintain', // lose_weight, maintain, gain_muscle
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/health/goals');
    };

    const handleCalculate = async () => {
        setCalcLoading(true);
        setCalcError(null);
        setCalculatedResults(null);
        try {
            // First update the profile (excluding goal_type)
            const { goal_type, ...profileUpdateData } = profileData;
            await axios.post(route('health.profile.update'), profileUpdateData);

            // Then calculate
            const response = await axios.post(route('health.profile.calculate'), { goal_type: profileData.goal_type });
            const result = response.data;

            setCalculatedResults(result); // Store results to show user first

            setData(prev => ({
                ...prev,
                daily_calorie_target: result.daily_calorie_target,
                daily_protein_target: result.daily_protein_target,
                daily_carbs_target: result.daily_carbs_target,
                daily_fats_target: result.daily_fats_target,
                daily_water_target: result.daily_water_target,
                current_weight: result.current_weight,
            }));

            // Optional: Auto close or let user see results
            // setShowCalculator(false);
        } catch (error) {
            console.error(error);
            setCalcError(error.response?.data?.error || 'An error occurred while calculating.');
        } finally {
            setCalcLoading(false);
        }
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

                    <div className="bg-white rounded-lg shadow p-6 mb-6 relative">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <Target className="w-8 h-8 text-indigo-600" />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Set Your Health Goals</h3>
                                    <p className="text-sm text-gray-600">Define your targets to track your progress effectively</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowCalculator(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors"
                            >
                                <Calculator className="w-4 h-4" />
                                Auto-Calculate
                            </button>
                        </div>

                        {/* Display TDEE/Maintenance if available from a previous calculation (conceptual, we could store it in a state if we wanted to show it persistently) */}
                        {/* For now, it just fills the form. */}

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

            {/* Calculator Modal */}
            {showCalculator && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setShowCalculator(false)}></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                        Calculate Your Needs
                                    </h3>
                                    <button onClick={() => setShowCalculator(false)} className="text-gray-400 hover:text-gray-500">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {calcError && (
                                        <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
                                            {calcError}
                                        </div>
                                    )}
                                    <p className="text-sm text-gray-500">
                                        We'll update your profile with these details to calculate your daily targets.
                                    </p>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                                            <input
                                                type="number"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                value={profileData.height}
                                                onChange={(e) => setProfileData({ ...profileData, height: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                                            <input
                                                type="number"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                value={profileData.weight}
                                                onChange={(e) => setProfileData({ ...profileData, weight: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                        <input
                                            type="date"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            value={profileData.birth_date}
                                            onChange={(e) => setProfileData({ ...profileData, birth_date: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                        <select
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            value={profileData.gender}
                                            onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                                        >
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Activity Level</label>
                                        <select
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            value={profileData.activity_level}
                                            onChange={(e) => setProfileData({ ...profileData, activity_level: e.target.value })}
                                        >
                                            <option value="sedentary">Sedentary (Little or no exercise)</option>
                                            <option value="light">Lightly Active (1-3 days/week)</option>
                                            <option value="moderate">Moderately Active (3-5 days/week)</option>
                                            <option value="active">Active (6-7 days/week)</option>
                                            <option value="very_active">Very Active (Physical job or hard exercise)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Goal</label>
                                        <select
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md font-medium text-indigo-900 bg-indigo-50"
                                            value={profileData.goal_type}
                                            onChange={(e) => setProfileData({ ...profileData, goal_type: e.target.value })}
                                        >
                                            <option value="lose_weight">Lose Weight (-500 kcal deficit)</option>
                                            <option value="maintain">Maintain Weight (Maintenance)</option>
                                            <option value="gain_muscle">Gain Muscle (+500 kcal surplus)</option>
                                        </select>
                                    </div>

                                    {calculatedResults && (
                                        <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-100">
                                            <p className="text-sm text-blue-800 font-medium">
                                                Based on your data:
                                            </p>
                                            <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-blue-700">
                                                <div>Maintenance: <span className="font-bold">{calculatedResults.maintenance_calories} kcal</span></div>
                                                <div>Target: <span className="font-bold">{calculatedResults.daily_calorie_target} kcal</span></div>
                                            </div>
                                            <p className="text-xs text-blue-600 mt-2">
                                                Values currently applied to the form.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    onClick={handleCalculate}
                                    disabled={calcLoading}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm disabled:bg-gray-400"
                                >
                                    {calcLoading ? 'Calculating...' : 'Calculate & Apply'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowCalculator(false)}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
