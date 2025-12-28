import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';

export default function SendEmail({ auth }) {
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        to: '',
        subject: '',
        body: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('settings.email.post-send'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Send Test Email</h2>}
        >
            <Head title="Send Email" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <header className="mb-6">
                                <h2 className="text-lg font-medium text-gray-900">Compose Email</h2>
                                <p className="mt-1 text-sm text-gray-600">
                                    Send a test email using your configured SMTP settings.
                                </p>
                            </header>

                            <form onSubmit={submit} className="space-y-6 max-w-2xl">
                                <div>
                                    <InputLabel htmlFor="to" value="To Address" />
                                    <TextInput
                                        id="to"
                                        type="email"
                                        className="mt-1 block w-full"
                                        value={data.to}
                                        onChange={(e) => setData('to', e.target.value)}
                                        required
                                        placeholder="recipient@example.com"
                                    />
                                    <InputError className="mt-2" message={errors.to} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="subject" value="Subject" />
                                    <TextInput
                                        id="subject"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        required
                                        placeholder="Test Email Subject"
                                    />
                                    <InputError className="mt-2" message={errors.subject} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="body" value="Message Body" />
                                    <TextArea
                                        id="body"
                                        className="mt-1 block w-full"
                                        value={data.body}
                                        onChange={(e) => setData('body', e.target.value)}
                                        required
                                        rows="6"
                                        placeholder="Enter your message here..."
                                    />
                                    <InputError className="mt-2" message={errors.body} />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>
                                        Send Email
                                    </PrimaryButton>

                                    {recentlySuccessful && (
                                        <p className="text-sm text-green-600">Email sent successfully.</p>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
