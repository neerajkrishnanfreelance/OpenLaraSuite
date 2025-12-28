import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function Index({ auth, crops }) {
    const { data, setData, get, processing, errors } = useForm({
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date().toISOString().split('T')[0],
        crop_id: '',
    });

    const submit = (e) => {
        e.preventDefault();
        get(route('agriculture.reports.daily'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Agriculture Reports</h2>}
        >
            <Head title="Agriculture Reports" />

            <div className="py-12">
                <div className="max-w-xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Generate Daily Report</h3>
                            <form onSubmit={submit}>
                                <div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <InputLabel htmlFor="start_date" value="Start Date" />
                                            <TextInput
                                                id="start_date"
                                                type="date"
                                                className="mt-1 block w-full"
                                                value={data.start_date}
                                                onChange={(e) => setData('start_date', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="end_date" value="End Date" />
                                            <TextInput
                                                id="end_date"
                                                type="date"
                                                className="mt-1 block w-full"
                                                value={data.end_date}
                                                onChange={(e) => setData('end_date', e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="crop_id" value="Filter by Crop (Optional)" />
                                    <select
                                        id="crop_id"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.crop_id}
                                        onChange={(e) => setData('crop_id', e.target.value)}
                                    >
                                        <option value="">All Crops</option>
                                        {crops && crops.map((crop) => (
                                            <option key={crop.id} value={crop.id}>
                                                {crop.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <PrimaryButton disabled={processing}>
                                        View Report
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
