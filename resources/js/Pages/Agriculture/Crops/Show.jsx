import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react'; // Ensure useForm is imported
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import { useState } from 'react';

export default function Show({ auth, crop }) {
    const [isLogModalOpen, setIsLogModalOpen] = useState(false);

    // Form logic for adding a log
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
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

    const submitLog = (e) => {
        e.preventDefault();
        post(route('agriculture.crop-logs.store'), {
            onSuccess: () => {
                setIsLogModalOpen(false);
                reset('notes', 'image', 'stage', 'temperature', 'humidity', 'log_type', 'input_name', 'input_quantity', 'input_unit');
            },
        });
    };

    const openLogModal = () => {
        clearErrors();
        setIsLogModalOpen(true);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Crop Details: {crop.name}
                        {crop.check_r_n_d && <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full align-middle">R&D</span>}
                    </h2>
                    <div className="flex gap-2">
                        <Link href={route('agriculture.crops.index')} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-300">Back</Link>
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

                    {/* Timeline Gallery */}
                    <h3 className="text-lg font-medium text-gray-900 mb-4 px-2">Growth Timeline / R&D Log</h3>

                    <div className="space-y-8">
                        {crop.logs.length === 0 ? (
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
                                    <div className="flex-grow bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                                        <div className="p-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mb-2">
                                                        {log.stage || 'Update'}
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
            </div>

            {/* Modal for Adding Log */}
            <Modal show={isLogModalOpen} onClose={() => setIsLogModalOpen(false)}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Add Daily Monitoring Log</h2>
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
                            <PrimaryButton className="ms-3" disabled={processing}>Save Log</PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
