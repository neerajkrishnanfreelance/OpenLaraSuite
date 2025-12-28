import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import { useState } from 'react';

export default function Show({ auth, crop }) {
    const [isLogModalOpen, setIsLogModalOpen] = useState(false);
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [editingLog, setEditingLog] = useState(null);

    // Form logic for adding a log
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        crop_id: crop.id,
        log_date: new Date().toISOString().split('T')[0],
        log_type: 'observation',
        stage: '',
        notes: '',
        image: null,
        temperature: '',
        humidity: '',
        input_name: '',
        input_quantity: '',
        input_unit: 'kg',
    });

    // Form logic for adding a schedule
    const { data: scheduleData, setData: setScheduleData, post: postSchedule, processing: scheduleProcessing, errors: scheduleErrors, reset: resetSchedule } = useForm({
        activity_type: 'watering',
        scheduled_date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0],
        notes: '',
    });

    const submitLog = (e) => {
        e.preventDefault();
        const options = {
            onSuccess: () => {
                setIsLogModalOpen(false);
                reset('notes', 'image', 'stage', 'temperature', 'humidity', 'log_type', 'input_name', 'input_quantity', 'input_unit');
                setEditingLog(null);
            },
        };

        if (editingLog) {
            router.post(route('agriculture.crop-logs.update', editingLog.id), {
                _method: 'put',
                ...data,
            }, options);
        } else {
            post(route('agriculture.crop-logs.store'), options);
        }
    };

    const editLog = (log) => {
        setEditingLog(log);
        setData({
            crop_id: crop.id,
            log_date: log.log_date,
            log_type: log.log_type,
            stage: log.stage || '',
            notes: log.notes || '',
            image: null,
            temperature: log.temperature || '',
            humidity: log.humidity || '',
            input_name: log.input_name || '',
            input_quantity: log.input_quantity || '',
            input_unit: log.input_unit || 'kg',
        });
        clearErrors();
        setIsLogModalOpen(true);
    };

    const submitSchedule = (e) => {
        e.preventDefault();
        postSchedule(route('agriculture.crops.schedules.store', crop.id), {
            onSuccess: () => {
                setIsScheduleModalOpen(false);
                resetSchedule();
            },
        });
    };

    const deleteLog = (logId) => {
        if (confirm('Are you sure you want to delete this log?')) {
            router.delete(route('agriculture.crop-logs.destroy', logId), { preserveScroll: true });
        }
    };

    const deleteCrop = () => {
        if (confirm('Are you sure you want to delete this crop? This will delete all associated logs and schedules.')) {
            router.delete(route('agriculture.crops.destroy', crop.id));
        }
    };

    const openLogModal = () => {
        setEditingLog(null);
        reset('notes', 'image', 'stage', 'temperature', 'humidity', 'log_type', 'input_name', 'input_quantity', 'input_unit');
        setData('log_date', new Date().toISOString().split('T')[0]);
        clearErrors();
        setIsLogModalOpen(true);
    };

    const markScheduleComplete = (scheduleId) => {
        if (confirm('Mark this schedule as done?')) {
            router.patch(route('agriculture.crops.schedules.complete', scheduleId), {}, {
                preserveScroll: true,
                onSuccess: () => {
                    // Start a new log if desired or just refresh
                }
            });
        }
    };

    const getScheduleColor = (date) => {
        const today = new Date().toISOString().split('T')[0];
        if (date < today) return 'text-red-600 bg-red-50 border-red-200';
        if (date === today) return 'text-yellow-600 bg-yellow-50 border-yellow-200 shadow-md';
        return 'text-gray-800';
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Crop Details: {crop.name}
                        {crop.check_r_n_d && <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full align-middle">R&D</span>}
                    </h2>
                    <div className="flex gap-2 flex-wrap justify-center">
                        <Link href={route('agriculture.crops.index')} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-300">Back</Link>
                        <Link href={route('agriculture.crops.edit', crop.id)} className="px-4 py-2 bg-yellow-500 text-white rounded-md text-sm font-medium hover:bg-yellow-600">Edit Crop</Link>
                        <button onClick={deleteCrop} className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700">Delete</button>
                        <SecondaryButton onClick={() => setIsScheduleModalOpen(true)}>+ Schedule Activity</SecondaryButton>
                        <PrimaryButton onClick={openLogModal}>+ Add Daily Log</PrimaryButton>
                    </div>
                </div>
            }
        >
            <Head title={`Crop: ${crop.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header Info */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Type</p>
                                <p className="font-medium text-gray-900">{crop.type || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Variety</p>
                                <p className="font-medium text-gray-900">{crop.variety || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Planted</p>
                                <p className="font-medium text-gray-900">{crop.planting_date || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Status</p>
                                <span className={`px-2 py-1 text-xs font-bold uppercase rounded ${crop.status === 'active' ? 'bg-green-100 text-green-800' :
                                    crop.status === 'harvested' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                    {crop.status}
                                </span>
                            </div>
                        </div>
                        {crop.notes && <div className="px-6 pb-6 border-t pt-4 text-gray-600 text-sm">{crop.notes}</div>}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Timeline */}
                        <div className="lg:col-span-2">
                            <h3 className="text-lg font-medium text-gray-900 mb-4 px-2">Growth Timeline / R&D Log</h3>
                            <div className="space-y-8">
                                {!crop.logs || crop.logs.length === 0 ? (
                                    <div className="text-center py-10 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                                        <p className="text-gray-500">No logs yet. Start monitoring this crop!</p>
                                    </div>
                                ) : (
                                    crop.logs.map((log) => (
                                        <div key={log.id} className="relative flex items-start gap-4">
                                            {/* Date Marker */}
                                            <div className="flex-none p-2 bg-white border border-gray-200 rounded-md shadow-sm text-center w-20">
                                                <div className="text-xs text-gray-500 uppercase font-bold">{new Date(log.log_date).toLocaleString('default', { month: 'short' })}</div>
                                                <div className="text-xl font-bold text-gray-900">{new Date(log.log_date).getDate()}</div>
                                                <div className="text-xs text-gray-400">{new Date(log.log_date).getFullYear()}</div>
                                            </div>

                                            {/* Content Card */}
                                            <div className="flex-grow bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden relative group">
                                                <div className="p-4">
                                                    <div className="absolute top-2 right-2 flex gap-2 is-visible">
                                                        <button onClick={() => editLog(log)} className="text-yellow-600 hover:text-yellow-800 text-sm bg-white/80 px-2 py-1 rounded shadow-sm">Edit</button>
                                                        <button onClick={() => deleteLog(log.id)} className="text-red-500 hover:text-red-700 text-sm bg-white/80 px-2 py-1 rounded shadow-sm">Delete</button>
                                                    </div>

                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mb-2">
                                                                {log.stage || log.log_type}
                                                            </span>
                                                            {log.notes && <p className="text-gray-800">{log.notes}</p>}
                                                        </div>
                                                        {(log.temperature || log.humidity) && (
                                                            <div className="text-xs text-gray-500 text-right">
                                                                {log.temperature && <div>{log.temperature}°C</div>}
                                                                {log.humidity && <div>{log.humidity}% Humidity</div>}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                {/* Image */}
                                                {log.image_path && (
                                                    <div className="w-full bg-gray-100 border-t border-gray-100">
                                                        <img
                                                            src={`/storage/${log.image_path}`}
                                                            alt={`Log for ${crop.name}`}
                                                            className="w-full h-auto max-h-96 object-contain mx-auto"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Sidebar: Schedules */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Schedules</h3>
                            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                                {crop.schedules && crop.schedules.length > 0 ? (
                                    <ul className="space-y-4">
                                        {crop.schedules.filter(s => !s.completed_at).map((schedule) => (
                                            <li key={schedule.id} className={`pb-4 border-b last:border-0 last:pb-0 p-2 rounded ${getScheduleColor(schedule.scheduled_date)}`}>
                                                <div className="flex justify-between items-center">
                                                    <span className="font-bold capitalize">{schedule.activity_type}</span>
                                                    <span className="text-sm">{new Date(schedule.scheduled_date).toLocaleDateString()}</span>
                                                </div>
                                                {schedule.notes && <p className="text-sm mt-1">{schedule.notes}</p>}
                                                <div className="mt-2 text-right">
                                                    <button
                                                        onClick={() => markScheduleComplete(schedule.id)}
                                                        className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition"
                                                    >
                                                        Mark as Done
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-center text-gray-500 text-sm py-4">No upcoming schedules.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for Adding Log */}
            <Modal show={isLogModalOpen} onClose={() => setIsLogModalOpen(false)}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">{editingLog ? 'Edit Log' : 'Add Daily Monitoring Log'}</h2>
                    <form onSubmit={submitLog}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="log_date" value="Date" />
                                <TextInput
                                    id="log_date"
                                    type="date"
                                    className="mt-1 block w-full"
                                    value={data.log_date}
                                    onChange={(e) => setData('log_date', e.target.value)}
                                    required
                                />
                                <InputError message={errors.log_date} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="log_type" value="Activity Type" />
                                <select
                                    id="log_type"
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    value={data.log_type}
                                    onChange={(e) => setData('log_type', e.target.value)}
                                >
                                    <option value="observation">Observation / Check</option>
                                    <option value="nutrition">Nutrition / Fertilizer</option>
                                    <option value="pesticide">Pesticide / Disease Control</option>
                                    <option value="water">Watering</option>
                                    <option value="harvest">Harvest</option>
                                </select>
                                <InputError message={errors.log_type} className="mt-2" />
                            </div>
                        </div>

                        {['nutrition', 'pesticide'].includes(data.log_type) && (
                            <div className={`mt-4 p-4 rounded-md border ${data.log_type === 'nutrition' ? 'bg-purple-50 border-purple-100' : 'bg-red-50 border-red-100'}`}>
                                <h4 className={`text-sm font-bold mb-2 ${data.log_type === 'nutrition' ? 'text-purple-800' : 'text-red-800'}`}>
                                    {data.log_type === 'nutrition' ? 'Nutrition Details' : 'Pesticide / Application Details'}
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="md:col-span-2">
                                        <InputLabel htmlFor="input_name" value="Product Name" />
                                        <TextInput
                                            id="input_name"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.input_name}
                                            onChange={(e) => setData('input_name', e.target.value)}
                                            placeholder={data.log_type === 'nutrition' ? "e.g. NPK 20-20-20" : "e.g. Neem Oil"}
                                        />
                                        <InputError message={errors.input_name} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="input_quantity" value="Quantity Applied" />
                                        <div className="flex">
                                            <TextInput
                                                id="input_quantity"
                                                type="number"
                                                step="0.01"
                                                className="mt-1 block w-full rounded-r-none"
                                                value={data.input_quantity}
                                                onChange={(e) => setData('input_quantity', e.target.value)}
                                                placeholder="0.00"
                                            />
                                            <TextInput
                                                id="input_unit"
                                                type="text"
                                                className="mt-1 block w-20 rounded-l-none border-l-0 bg-gray-50"
                                                value={data.input_unit}
                                                onChange={(e) => setData('input_unit', e.target.value)}
                                                placeholder="Unit"
                                            />
                                        </div>
                                        <InputError message={errors.input_quantity} className="mt-2" />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mt-4">
                            <InputLabel htmlFor="stage" value="Growth Stage (Optional)" />
                            <TextInput
                                id="stage"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.stage}
                                onChange={(e) => setData('stage', e.target.value)}
                                placeholder="e.g. Flowering"
                            />
                            <InputError message={errors.stage} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="notes" value="Observations / Notes" />
                            <textarea
                                id="notes"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                rows="3"
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                placeholder="Leaves looking green..."
                            ></textarea>
                            <InputError message={errors.notes} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="image" value="Take Photo / Upload Image" />
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                capture="environment" // Hints mobile browsers to use camera
                                className="mt-1 block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-indigo-50 file:text-indigo-700
                                hover:file:bg-indigo-100"
                                onChange={(e) => setData('image', e.target.files[0])}
                            />
                            <p className="text-xs text-gray-500 mt-1">Use camera on mobile to take a daily photo.</p>
                            <InputError message={errors.image} className="mt-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <InputLabel htmlFor="temperature" value="Temp (°C) (Opt)" />
                                <TextInput
                                    id="temperature"
                                    type="number"
                                    step="0.1"
                                    className="mt-1 block w-full"
                                    value={data.temperature}
                                    onChange={(e) => setData('temperature', e.target.value)}
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="humidity" value="Humidity (%) (Opt)" />
                                <TextInput
                                    id="humidity"
                                    type="number"
                                    step="0.1"
                                    className="mt-1 block w-full"
                                    value={data.humidity}
                                    onChange={(e) => setData('humidity', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <SecondaryButton onClick={() => setIsLogModalOpen(false)}>Cancel</SecondaryButton>
                            <PrimaryButton className="ms-3" disabled={processing}>{editingLog ? 'Update Log' : 'Save Log'}</PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Modal for Adding Schedule */}
            <Modal show={isScheduleModalOpen} onClose={() => setIsScheduleModalOpen(false)}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Schedule Activity</h2>
                    <form onSubmit={submitSchedule}>
                        <div className="mb-4">
                            <InputLabel htmlFor="activity_type" value="Activity Type" />
                            <select
                                id="activity_type"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                value={scheduleData.activity_type}
                                onChange={(e) => setScheduleData('activity_type', e.target.value)}
                            >
                                <option value="watering">Watering</option>
                                <option value="fertilizer">Fertilizer</option>
                                <option value="pesticide">Pesticide</option>
                                <option value="harvest">Harvest</option>
                                <option value="other">Other</option>
                            </select>
                            <InputError message={scheduleErrors.activity_type} className="mt-2" />
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="scheduled_date" value="Scheduled Date" />
                            <TextInput
                                id="scheduled_date"
                                type="date"
                                className="mt-1 block w-full"
                                value={scheduleData.scheduled_date}
                                onChange={(e) => setScheduleData('scheduled_date', e.target.value)}
                                required
                            />
                            <InputError message={scheduleErrors.scheduled_date} className="mt-2" />
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="schedule_notes" value="Notes" />
                            <TextInput
                                id="schedule_notes"
                                type="text"
                                className="mt-1 block w-full"
                                value={scheduleData.notes}
                                onChange={(e) => setScheduleData('notes', e.target.value)}
                                placeholder="E.g. Apply 2kg NPK"
                            />
                            <InputError message={scheduleErrors.notes} className="mt-2" />
                        </div>

                        <div className="mt-6 flex justify-end">
                            <SecondaryButton onClick={() => setIsScheduleModalOpen(false)}>Cancel</SecondaryButton>
                            <PrimaryButton className="ms-3" disabled={scheduleProcessing}>Save Schedule</PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout >
    );
}
