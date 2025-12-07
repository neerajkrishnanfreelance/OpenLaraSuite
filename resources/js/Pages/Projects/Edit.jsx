import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SecondaryButton from '@/Components/SecondaryButton';
import FormHeader from '@/Components/FormHeader';
import FormPageLayout from '@/Components/FormPageLayout';

export default function Edit({ auth, project, users, ...props }) {
    const { data, setData, put, processing, errors } = useForm({
        name: project.name || '',
        description: project.description || '',
        status: project.status || 'active',
        start_date: project.start_date || '',
        end_date: project.end_date || '',
        user_ids: project.users.map(u => u.id),
    });

    const submit = (e) => {
        console.log(data);
        e.preventDefault();
        put(route('projects.update', project.id));
    };

    const handleUserSelect = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => parseInt(option.value));
        setData('user_ids', selectedOptions);
    };

    return (
        <AuthenticatedLayout
            header={
                <FormHeader title={`Edit Project: ${project.name}`} backRoute="projects.index">
                    <PrimaryButton form="edit-project-form" disabled={processing}>
                        Update Project
                    </PrimaryButton>
                </FormHeader>
            }
        >
            <Head title={`Edit Project: ${project.name}`} />

            <FormPageLayout
                chatterData={props.chatter_data}
                meetingsData={props.meetings_data}
                chatterableId={project.id}
                chatterableType="App\\Models\\Project"
            >
                <form id="edit-project-form" onSubmit={submit}>
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
                        <InputLabel htmlFor="users" value="Assign Employees (Hold Ctrl/Cmd to select multiple)" />
                        <select
                            id="users"
                            multiple
                            className="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm h-32"
                            value={data.user_ids}
                            onChange={handleUserSelect}
                        >
                            {users.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.name} ({user.email})
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.user_ids} className="mt-2" />
                    </div>
                </form>
            </FormPageLayout>
        </AuthenticatedLayout>
    );
}
