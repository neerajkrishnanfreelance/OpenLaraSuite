import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Create({ auth, users = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        hourly_rate: '',
        company: '',
        address: '',
        description: '',
        status: 'prospect',
        assigned_to: '',
        source: '',
        tags: [],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('contacts.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add Contact</h2>}
        >
            <Head title="Add Contact" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel forInput="name" value="Name" />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        isFocused
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel forInput="email" value="Email" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        className="mt-1 block w-full"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel forInput="phone" value="Phone" />
                                    <TextInput
                                        id="phone"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                    />
                                    <InputError message={errors.phone} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel forInput="company" value="Company" />
                                    <TextInput
                                        id="company"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.company}
                                        onChange={(e) => setData('company', e.target.value)}
                                    />
                                    <InputError message={errors.company} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel forInput="hourly_rate" value="Hourly Rate ($)" />
                                    <TextInput
                                        id="hourly_rate"
                                        type="number"
                                        step="0.01"
                                        className="mt-1 block w-full"
                                        value={data.hourly_rate}
                                        onChange={(e) => setData('hourly_rate', e.target.value)}
                                    />
                                    <InputError message={errors.hourly_rate} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel forInput="address" value="Address" />
                                    <textarea
                                        id="description"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        rows="3"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                    ></textarea>
                                    <InputError message={errors.address} className="mt-2" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <div>
                                        <InputLabel forInput="status" value="Status" />
                                        <select
                                            id="status"
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                        >
                                            <option value="prospect">Prospect</option>
                                            <option value="active">Active</option>
                                            <option value="converted">Converted</option>
                                            <option value="lost">Lost</option>
                                        </select>
                                        <InputError message={errors.status} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel forInput="assigned_to" value="Assigned To" />
                                        <select
                                            id="assigned_to"
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            value={data.assigned_to}
                                            onChange={(e) => setData('assigned_to', e.target.value)}
                                        >
                                            <option value="">Unassigned</option>
                                            {users.map(user => (
                                                <option key={user.id} value={user.id}>{user.name}</option>
                                            ))}
                                        </select>
                                        <InputError message={errors.assigned_to} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel forInput="source" value="Source" />
                                        <TextInput
                                            id="source"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.source}
                                            onChange={(e) => setData('source', e.target.value)}
                                            placeholder="e.g. Website, Referral"
                                        />
                                        <InputError message={errors.source} className="mt-2" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-end mt-6">
                                    <Link href={route('contacts.index')}>
                                        <SecondaryButton className="mr-3">Cancel</SecondaryButton>
                                    </Link>
                                    <PrimaryButton disabled={processing}>
                                        Save Contact
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
