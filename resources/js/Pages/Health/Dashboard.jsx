import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Heart, Flame, Dumbbell, Utensils, TrendingUp, Target } from 'lucide-react';

export default function HealthDashboard({
    auth,
    healthGoal,
    todayNutrition,
    todayWorkoutSummary,
    weeklyNutritionTrend,
    weeklyWorkoutTrend,
    recentFoodLogs,
    recentWorkouts,
    currentDate
}) {
    // Calculate progress percentages
    const calorieProgress = healthGoal?.daily_calorie_target
        ? (todayNutrition.calories / healthGoal.daily_calorie_target) * 100
        : 0;

    const proteinProgress = healthGoal?.daily_protein_target
        ? (todayNutrition.protein / healthGoal.daily_protein_target) * 100
        : 0;

    const workoutProgress = healthGoal?.weekly_workout_target
        ? (todayWorkoutSummary.count / healthGoal.weekly_workout_target) * 7 * 100
        : 0;

    // Macro distribution for pie chart
    const macroData = [
        { name: 'Protein', value: parseFloat(todayNutrition.protein) || 0, color: '#3b82f6' },
        { name: 'Carbs', value: parseFloat(todayNutrition.carbs) || 0, color: '#10b981' },
        { name: 'Fats', value: parseFloat(todayNutrition.fats) || 0, color: '#f59e0b' },
    ];

    const KPICard = ({ icon: Icon, title, value, target, unit, progress, color }) => (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-${color}-100`}>
                    <Icon className={`w-6 h-6 text-${color}-600`} />
                </div>
                {target && (
                    <span className="text-sm text-gray-500">
                        Target: {target}{unit}
                    </span>
                )}
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
            <p className="text-3xl font-bold text-gray-900">
                {value}
                <span className="text-lg text-gray-500 ml-1">{unit}</span>
            </p>
            {progress !== undefined && (
                <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className={`bg-${color}-600 h-2 rounded-full transition-all duration-300`}
                            style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{Math.round(progress)}% of goal</p>
                </div>
            )}
        </div>
    );

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Health & Wellness Dashboard
                    </h2>
                    <div className="flex gap-2">
                        <Link
                            href="/health/food-logs"
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium"
                        >
                            Log Food
                        </Link>
                        <Link
                            href="/health/workouts"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
                        >
                            Log Workout
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Health Dashboard" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <KPICard
                            icon={Flame}
                            title="Calories Today"
                            value={Math.round(todayNutrition.calories)}
                            target={healthGoal?.daily_calorie_target}
                            unit=" kcal"
                            progress={calorieProgress}
                            color="red"
                        />
                        <KPICard
                            icon={Utensils}
                            title="Protein Today"
                            value={Math.round(todayNutrition.protein)}
                            target={healthGoal?.daily_protein_target}
                            unit="g"
                            progress={proteinProgress}
                            color="blue"
                        />
                        <KPICard
                            icon={Dumbbell}
                            title="Workouts Today"
                            value={todayWorkoutSummary.count}
                            target={healthGoal?.weekly_workout_target ? Math.ceil(healthGoal.weekly_workout_target / 7) : null}
                            unit=" sessions"
                            progress={workoutProgress}
                            color="green"
                        />
                        <KPICard
                            icon={TrendingUp}
                            title="Calories Burned"
                            value={Math.round(todayWorkoutSummary.total_calories_burned)}
                            unit=" kcal"
                            color="purple"
                        />
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

                        {/* Weekly Calorie Trend */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Calorie Trend</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={weeklyNutritionTrend}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="calories" stroke="#ef4444" strokeWidth={2} name="Calories" />
                                    {healthGoal?.daily_calorie_target && (
                                        <Line
                                            type="monotone"
                                            dataKey={() => healthGoal.daily_calorie_target}
                                            stroke="#9ca3af"
                                            strokeDasharray="5 5"
                                            name="Target"
                                        />
                                    )}
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Macro Distribution */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Macro Distribution</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={macroData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, value }) => `${name}: ${Math.round(value)}g`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {macroData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <p className="text-sm text-gray-600">Protein</p>
                                    <p className="text-lg font-semibold text-blue-600">{Math.round(todayNutrition.protein)}g</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Carbs</p>
                                    <p className="text-lg font-semibold text-green-600">{Math.round(todayNutrition.carbs)}g</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Fats</p>
                                    <p className="text-lg font-semibold text-yellow-600">{Math.round(todayNutrition.fats)}g</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Weekly Workout Chart */}
                    <div className="bg-white rounded-lg shadow p-6 mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Workout Activity</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={weeklyWorkoutTrend}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip />
                                <Legend />
                                <Line yAxisId="left" type="monotone" dataKey="minutes" stroke="#3b82f6" strokeWidth={2} name="Minutes" />
                                <Line yAxisId="right" type="monotone" dataKey="calories" stroke="#10b981" strokeWidth={2} name="Calories Burned" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Recent Activity */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/* Recent Food Logs */}
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-6 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900">Recent Food Logs</h3>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {recentFoodLogs.length > 0 ? (
                                    recentFoodLogs.map((log) => (
                                        <div key={log.id} className="p-4 hover:bg-gray-50">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-medium text-gray-900">{log.food_item.name}</p>
                                                    <p className="text-sm text-gray-500">
                                                        {log.servings} × {log.food_item.serving_size}{log.food_item.serving_unit} • {log.meal_type}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold text-gray-900">{Math.round(log.total_calories)} kcal</p>
                                                    <p className="text-xs text-gray-500">
                                                        {new Date(log.consumed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center text-gray-500">
                                        No food logs yet. Start tracking your meals!
                                    </div>
                                )}
                            </div>
                            <div className="p-4 bg-gray-50 border-t border-gray-200">
                                <Link href="/health/food-logs" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                                    View all food logs →
                                </Link>
                            </div>
                        </div>

                        {/* Recent Workouts */}
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-6 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900">Recent Workouts</h3>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {recentWorkouts.length > 0 ? (
                                    recentWorkouts.map((workout) => (
                                        <div key={workout.id} className="p-4 hover:bg-gray-50">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-medium text-gray-900">{workout.workout_type.name}</p>
                                                    <p className="text-sm text-gray-500">
                                                        {workout.duration_minutes} min • {workout.intensity} intensity
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold text-gray-900">{Math.round(workout.calories_burned)} kcal</p>
                                                    <p className="text-xs text-gray-500">
                                                        {new Date(workout.performed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center text-gray-500">
                                        No workouts logged yet. Get moving!
                                    </div>
                                )}
                            </div>
                            <div className="p-4 bg-gray-50 border-t border-gray-200">
                                <Link href="/health/workouts" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                                    View all workouts →
                                </Link>
                            </div>
                        </div>

                    </div>

                    {/* Goals CTA */}
                    {!healthGoal && (
                        <div className="mt-8 bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                            <div className="flex items-center gap-4">
                                <Target className="w-12 h-12 text-indigo-600" />
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Set Your Health Goals</h3>
                                    <p className="text-gray-600">
                                        Define your daily calorie targets, macro goals, and workout targets to track your progress effectively.
                                    </p>
                                </div>
                                <Link
                                    href="/health/goals"
                                    className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium whitespace-nowrap"
                                >
                                    Set Goals
                                </Link>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
