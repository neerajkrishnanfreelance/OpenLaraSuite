import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';

export default function EmailConfiguration({ auth, config }) {
    const { data, setData, patch, processing, recentlySuccessful, errors } = useForm({
        driver: config?.driver || 'smtp',
        host: config?.host || '',
        port: config?.port || '',
        username: config?.username || '',
        password: config?.password || '', // Password remains hidden/placeholder if needed, but for now simple
        encryption: config?.encryption || 'tls',
        from_address: config?.from_address || '',
        from_name: config?.from_name || '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('settings.email.update'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Email Configuration</h2>}
        >
            <Head title="Email Configuration" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <div>
                                    <InputLabel htmlFor="host" value="SMTP Host" />
                                    <TextInput
                                        id="host"
                                        className="mt-1 block w-full"
                                        value={data.host}
                                        onChange={(e) => setData('host', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="host"
                                    />
                                    {errors.host && <div className="text-red-500 text-sm mt-1">{errors.host}</div>}
                                </div>

                                <div>
                                    <InputLabel htmlFor="port" value="SMTP Port" />
                                    <TextInput
                                        id="port"
                                        className="mt-1 block w-full"
                                        value={data.port}
                                        onChange={(e) => setData('port', e.target.value)}
                                        required
                                    />
                                    {errors.port && <div className="text-red-500 text-sm mt-1">{errors.port}</div>}
                                </div>

                                <div>
                                    <InputLabel htmlFor="username" value="SMTP Username" />
                                    <TextInput
                                        id="username"
                                        className="mt-1 block w-full"
                                        value={data.username}
                                        onChange={(e) => setData('username', e.target.value)}
                                    />
                                    {errors.username && <div className="text-red-500 text-sm mt-1">{errors.username}</div>}
                                </div>

                                <div>
                                    <InputLabel htmlFor="password" value="SMTP Password" />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        className="mt-1 block w-full"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                                </div>

                                <div>
                                    <InputLabel htmlFor="encryption" value="Encryption (tls/ssl)" />
                                    <TextInput
                                        id="encryption"
                                        className="mt-1 block w-full"
                                        value={data.encryption}
                                        onChange={(e) => setData('encryption', e.target.value)}
                                    />
                                    {errors.encryption && <div className="text-red-500 text-sm mt-1">{errors.encryption}</div>}
                                </div>

                                <div>
                                    <InputLabel htmlFor="from_address" value="From Address" />
                                    <TextInput
                                        id="from_address"
                                        type="email"
                                        className="mt-1 block w-full"
                                        value={data.from_address}
                                        onChange={(e) => setData('from_address', e.target.value)}
                                        required
                                    />
                                    {errors.from_address && <div className="text-red-500 text-sm mt-1">{errors.from_address}</div>}
                                </div>

                                <div>
                                    <InputLabel htmlFor="from_name" value="From Name" />
                                    <TextInput
                                        id="from_name"
                                        className="mt-1 block w-full"
                                        value={data.from_name}
                                        onChange={(e) => setData('from_name', e.target.value)}
                                        required
                                    />
                                    {errors.from_name && <div className="text-red-500 text-sm mt-1">{errors.from_name}</div>}
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600">Saved.</p>
                                    </Transition>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
