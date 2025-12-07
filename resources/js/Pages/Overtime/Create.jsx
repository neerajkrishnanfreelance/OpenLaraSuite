import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SecondaryButton from '@/Components/SecondaryButton';
import FormHeader from '@/Components/FormHeader';
import FormPageLayout from '@/Components/FormPageLayout';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        date: '',
        start_time: '',
        end_time: '',
        reason: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('overtime-requests.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <FormHeader title="Request Overtime" backRoute="overtime-requests.index">
                    <PrimaryButton form="create-overtime-form" disabled={processing}>
                        Submit Request
                    </PrimaryButton>
                </FormHeader>
            }
        >
            <Head title="Request Overtime" />

            <FormPageLayout isCreate={true}>
                <form id="create-overtime-form" onSubmit={submit}>
                    <div className="mt-4">
                        <InputLabel htmlFor="date" value="Date" />
                        <TextInput
                            id="date"
                            type="date"
                            className="mt-1 block w-full"
                            value={data.date}
                            onChange={(e) => setData('date', e.target.value)}
                            required
                        />
                        <InputError message={errors.date} className="mt-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <InputLabel htmlFor="start_time" value="Start Time" />
                            <TextInput
                                id="start_time"
                                type="time"
                                className="mt-1 block w-full"
                                value={data.start_time}
                                onChange={(e) => setData('start_time', e.target.value)}
                                required
                            />
                            <InputError message={errors.start_time} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="end_time" value="End Time" />
                            <TextInput
                                id="end_time"
                                type="time"
                                className="mt-1 block w-full"
                                value={data.end_time}
                                onChange={(e) => setData('end_time', e.target.value)}
                                required
                            />
                            <InputError message={errors.end_time} className="mt-2" />
                        </div>
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="reason" value="Reason" />
                        <textarea
                            id="reason"
                            className="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm"
                            value={data.reason}
                            onChange={(e) => setData('reason', e.target.value)}
                            required
                        />
                        <InputError message={errors.reason} className="mt-2" />
                    </div>
                </form>
            </FormPageLayout>
        </AuthenticatedLayout>
    );
}
