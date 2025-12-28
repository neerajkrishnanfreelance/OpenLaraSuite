import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';
import FormHeader from '@/Components/FormHeader';
import FormPageLayout from '@/Components/FormPageLayout';

export default function Edit({ auth, crop }) {
    const { data, setData, put, processing, errors } = useForm({
        name: crop.name || '',
        type: crop.type || '',
        variety: crop.variety || '',
        planting_date: crop.planting_date || '',
        harvest_date: crop.harvest_date || '',
        status: crop.status || 'active',
        check_r_n_d: crop.check_r_n_d ? true : false,
        notes: crop.notes || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('agriculture.crops.update', crop.id));
    };

    return (
        <AuthenticatedLayout
            header={<FormHeader title={`Edit Crop: ${crop.name}`} backRoute="agriculture.crops.index" />}
        >
            <Head title={`Edit Crop: ${crop.name}`} />

            <FormPageLayout>
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <InputLabel htmlFor="name" value="Crop Name / Identifier" />
                            <TextInput
                                id="name"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="type" value="Type" />
                            <TextInput
                                id="type"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value)}
                            />
                            <InputError message={errors.type} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="variety" value="Variety" />
                            <TextInput
                                id="variety"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.variety}
                                onChange={(e) => setData('variety', e.target.value)}
                            />
                            <InputError message={errors.variety} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="planting_date" value="Planting Date" />
                            <TextInput
                                id="planting_date"
                                type="date"
                                className="mt-1 block w-full"
                                value={data.planting_date}
                                onChange={(e) => setData('planting_date', e.target.value)}
                            />
                            <InputError message={errors.planting_date} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="status" value="Status" />
                            <select
                                id="status"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                            >
                                <option value="active">Active (Growing)</option>
                                <option value="harvested">Harvested</option>
                                <option value="failed">Failed</option>
                            </select>
                            <InputError message={errors.status} className="mt-2" />
                        </div>
                        <div className="flex items-center mt-6">
                            <label className="flex items-center">
                                <Checkbox
                                    name="check_r_n_d"
                                    checked={data.check_r_n_d}
                                    onChange={(e) => setData('check_r_n_d', e.target.checked)}
                                />
                                <span className="ms-2 text-sm text-gray-600">Is R&D Project?</span>
                            </label>
                        </div>
                    </div>

                    <div className="mb-6">
                        <InputLabel htmlFor="notes" value="Notes" />
                        <textarea
                            id="notes"
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            rows="3"
                            value={data.notes}
                            onChange={(e) => setData('notes', e.target.value)}
                        ></textarea>
                        <InputError message={errors.notes} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Link href={route('agriculture.crops.show', crop.id)} className="text-gray-600 hover:text-gray-900 mr-4">Cancel</Link>
                        <PrimaryButton className="ms-4" disabled={processing}>
                            Update Crop
                        </PrimaryButton>
                    </div>
                </form>
            </FormPageLayout>
        </AuthenticatedLayout>
    );
}
