import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, X, Edit2, Trash2, Dumbbell } from 'lucide-react';

export default function WorkoutsIndex({ auth, workouts, workoutTypes, dailyTotals, currentDate }) {
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingWorkout, setEditingWorkout] = useState(null);

    const { data, setData, post, put, processing, reset } = useForm({
        workout_type_id: '',
        duration_minutes: 30,
        distance: '',
        distance_unit: 'km',
        intensity: 'medium',
        performed_at: new Date().toISOString().slice(0, 16),
        sets: '',
        reps: '',
        weight: '',
        notes: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingWorkout) {
            put(`/health/workouts/${editingWorkout.id}`, {
                onSuccess: () => {
                    setShowAddModal(false);
                    setEditingWorkout(null);
                    reset();
                }
            });
        } else {
            post('/health/workouts', {
                onSuccess: () => {
                    setShowAddModal(false);
                    reset();
                }
            });
        }
    };

    const handleDelete = (workoutId) => {
        if (confirm('Are you sure you want to delete this workout?')) {
            router.delete(`/health/workouts/${workoutId}`);
        }
    };

    const handleEdit = (workout) => {
        setEditingWorkout(workout);
        setData({
            workout_type_id: workout.workout_type_id,
            duration_minutes: workout.duration_minutes,
            distance: workout.distance || '',
            distance_unit: workout.distance_unit || 'km',
            intensity: workout.intensity,
            performed_at: new Date(workout.performed_at).toISOString().slice(0, 16),
            sets: workout.sets || '',
            reps: workout.reps || '',
            weight: workout.weight || '',
            notes: workout.notes || '',
        });
        setShowAddModal(true);
    };

    const groupedWorkoutTypes = workoutTypes.reduce((acc, type) => {
        if (!acc[type.category]) {
            acc[type.category] = [];
        }
        acc[type.category].push(type);
        return acc;
    }, {});

    const selectedWorkoutType = workoutTypes.find(t => t.id === parseInt(data.workout_type_id));
    const isStrength = selectedWorkoutType?.category === 'strength';
    const isCardio = selectedWorkoutType?.category === 'cardio';

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Workout Logs</h2>
                    <button
                        onClick={() => {
                            setEditingWorkout(null);
                            reset();
                            setShowAddModal(true);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Log Workout
                    </button>
                </div>
            }
        >
            <Head title="Workout Logs" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Daily Summary */}
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Workout Summary</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center">
                                <p className="text-3xl font-bold text-blue-600">{dailyTotals.count}</p>
                                <p className="text-sm text-gray-600">Workouts</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-green-600">{dailyTotals.total_minutes}</p>
                                <p className="text-sm text-gray-600">Minutes</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-red-600">{Math.round(dailyTotals.total_calories)}</p>
                                <p className="text-sm text-gray-600">Calories Burned</p>
                            </div>
                            {dailyTotals.total_distance > 0 && (
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-purple-600">{dailyTotals.total_distance.toFixed(2)}</p>
                                    <p className="text-sm text-gray-600">km Covered</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Workout List */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Today's Workouts</h3>
                        </div>
                        <div className="p-6">
                            {workouts.length > 0 ? (
                                <div className="space-y-4">
                                    {workouts.map((workout) => (
                                        <div key={workout.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-blue-100 rounded-lg">
                                                    <Dumbbell className="w-6 h-6 text-blue-600" />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-900">{workout.workout_type.name}</h4>
                                                    <p className="text-sm text-gray-600">
                                                        {workout.duration_minutes} min • {workout.intensity} intensity
                                                        {workout.distance && (
                                                            <> • {workout.distance} {workout.distance_unit || 'km'}</>
                                                        )}
                                                    </p>
                                                    {workout.distance && workout.speed && (
                                                        <p className="text-sm text-gray-500">
                                                            Speed: {workout.speed} {workout.distance_unit || 'km'}/h • Pace: {workout.pace} min/{workout.distance_unit || 'km'}
                                                        </p>
                                                    )}
                                                    {workout.sets && workout.reps && (
                                                        <p className="text-sm text-gray-500">
                                                            {workout.sets} sets × {workout.reps} reps
                                                            {workout.weight && ` @ ${workout.weight}kg`}
                                                        </p>
                                                    )}
                                                    {workout.notes && (
                                                        <p className="text-sm text-gray-500 mt-1">{workout.notes}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="text-right">
                                                    <p className="font-semibold text-gray-900">{Math.round(workout.calories_burned)} kcal</p>
                                                    <p className="text-xs text-gray-500">
                                                        {new Date(workout.performed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEdit(workout)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(workout.id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 text-gray-500">
                                    No workouts logged today. Time to get moving!
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* Add/Edit Workout Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">
                                {editingWorkout ? 'Edit Workout' : 'Log Workout'}
                            </h3>
                            <button onClick={() => {
                                setShowAddModal(false);
                                setEditingWorkout(null);
                                reset();
                            }}>
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Workout Type
                                </label>
                                <select
                                    value={data.workout_type_id}
                                    onChange={(e) => setData('workout_type_id', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select workout type...</option>
                                    {Object.entries(groupedWorkoutTypes).map(([category, types]) => (
                                        <optgroup key={category} label={category.charAt(0).toUpperCase() + category.slice(1)}>
                                            {types.map((type) => (
                                                <option key={type.id} value={type.id}>
                                                    {type.icon} {type.name}
                                                </option>
                                            ))}
                                        </optgroup>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Duration (min)
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={data.duration_minutes}
                                        onChange={(e) => setData('duration_minutes', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Intensity
                                    </label>
                                    <select
                                        value={data.intensity}
                                        onChange={(e) => setData('intensity', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        required
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                            </div>

                            {isCardio && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Distance
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={data.distance}
                                            onChange={(e) => setData('distance', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            placeholder="Optional"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Unit
                                        </label>
                                        <select
                                            value={data.distance_unit}
                                            onChange={(e) => setData('distance_unit', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        >
                                            <option value="km">Kilometers</option>
                                            <option value="mi">Miles</option>
                                            <option value="m">Meters</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {isStrength && (
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Sets
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={data.sets}
                                            onChange={(e) => setData('sets', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Reps
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={data.reps}
                                            onChange={(e) => setData('reps', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Weight (kg)
                                        </label>
                                        <input
                                            type="number"
                                            step="0.5"
                                            min="0"
                                            value={data.weight}
                                            onChange={(e) => setData('weight', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Time
                                </label>
                                <input
                                    type="datetime-local"
                                    value={data.performed_at}
                                    onChange={(e) => setData('performed_at', e.target.value)}
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
                                    disabled={processing}
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300"
                                >
                                    {editingWorkout ? 'Update' : 'Log Workout'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddModal(false);
                                        setEditingWorkout(null);
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
