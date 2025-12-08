import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SecondaryButton from '@/Components/SecondaryButton';
import FormHeader from '@/Components/FormHeader';
import FormPageLayout from '@/Components/FormPageLayout';
import MultiSelect from '@/Components/MultiSelect';

export default function Create({ auth, users }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        status: 'active',
        start_date: '',
        end_date: '',
        user_ids: [],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('projects.store'));
    };

    const handleUserSelect = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => parseInt(option.value));
        setData('user_ids', selectedOptions);
    };

    return (
        <AuthenticatedLayout
            header={
                <FormHeader title="Create Project" backRoute="projects.index">
                    <PrimaryButton form="create-project-form" disabled={processing}>
                        Create Project
                    </PrimaryButton>
                </FormHeader>
            }
        >
            <Head title="Create Project" />

            <FormPageLayout isCreate={true}>
                <form id="create-project-form" onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="name" value="Project Name" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="description" value="Description" />
                        <textarea
                            id="description"
                            className="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        <InputError message={errors.description} className="mt-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <InputLabel htmlFor="start_date" value="Start Date" />
                            <TextInput
                                id="start_date"
                                type="date"
                                className="mt-1 block w-full"
                                value={data.start_date}
                                onChange={(e) => setData('start_date', e.target.value)}
                            />
                            <InputError message={errors.start_date} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="end_date" value="End Date" />
                            <TextInput
                                id="end_date"
                                type="date"
                                className="mt-1 block w-full"
                                value={data.end_date}
                                onChange={(e) => setData('end_date', e.target.value)}
                            />
                            <InputError message={errors.end_date} className="mt-2" />
                        </div>
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="status" value="Status" />
                        <select
                            id="status"
                            className="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm"
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                        >
                            <option value="active">Active</option>
                            <option value="archived">Archived</option>
                        </select>
                        <InputError message={errors.status} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <MultiSelect
                            label="Assign Employees"
                            options={users.map(u => ({ value: u.id, label: `${u.name} (${u.email})` }))}
                            value={data.user_ids}
                            onChange={(vals) => setData('user_ids', vals)}
                        />
                        <InputError message={errors.user_ids} className="mt-2" />
                    </div>
                </form>
            </FormPageLayout>
        </AuthenticatedLayout>
    );
}
