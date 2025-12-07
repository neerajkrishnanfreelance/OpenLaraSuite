import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import FormHeader from '@/Components/FormHeader';
import FormPageLayout from '@/Components/FormPageLayout';

export default function Edit({ auth, employee, roles, ...props }) {
    const { data, setData, put, processing, errors } = useForm({
        name: employee.name || '',
        email: employee.email || '',
        role: employee.roles[0]?.name || 'employee',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('employees.update', employee.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <FormHeader title="Edit Employee" backRoute="employees.index">
                    <PrimaryButton form="edit-employee-form" disabled={processing}>
                        Update Employee
                    </PrimaryButton>
                </FormHeader>
            }
        >
            <Head title="Edit Employee" />

            <FormPageLayout
                chatterData={props.chatter_data}
                meetingsData={props.meetings_data}
                chatterableId={employee.id}
                chatterableType="App\Models\User"
            >
                <form id="edit-employee-form" onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="name" value="Name" />
                        <TextInput
                            id="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="role" value="Role" />
                        <select
                            id="role"
                            className="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm"
                            value={data.role}
                            onChange={(e) => setData('role', e.target.value)}
                            required
                        >
                            <option value="">Select Role</option>
                            {roles.map(role => (
                                <option key={role.id} value={role.name}>{role.name}</option>
                            ))}
                        </select>
                        <InputError message={errors.role} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Password (Leave blank to keep current)" />
                        <TextInput
                            id="password"
                            type="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                        />
                    </div>
                </form>
            </FormPageLayout>
        </AuthenticatedLayout>
    );
}
