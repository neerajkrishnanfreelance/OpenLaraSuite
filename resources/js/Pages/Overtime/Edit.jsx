import React from 'react';
import { useForm, usePage, Head } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import FormPageLayout from '@/Components/FormPageLayout';
import FormHeader from '@/Components/FormHeader';

export default function Edit({ auth, request: overtimeRequest, chatter_data, meetings_data }) {
    const { data, setData, put, processing, errors } = useForm({
        date: overtimeRequest.date,
        start_time: overtimeRequest.start_time,
        end_time: overtimeRequest.end_time,
        reason: overtimeRequest.reason,
        status: overtimeRequest.status,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('overtime-requests.update', overtimeRequest.id));
    };

    const isApprovable = (auth.user.roles.some(r => ['admin', 'manager'].includes(r.name)));

    return (
        <FormPageLayout
            chatterData={chatter_data}
            meetingsData={meetings_data}
            chatterableId={overtimeRequest.id}
            chatterableType="App\Models\OvertimeRequest"
        >
            <FormHeader title="Edit Overtime Request" backRoute="overtime-requests.index">
                <PrimaryButton form="edit-overtime-form" disabled={processing}>
                    Update Request
                </PrimaryButton>
            </FormHeader>

            <Head title="Edit Overtime Request" />

            <form id="edit-overtime-form" onSubmit={submit} className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
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

                <div>
                    <InputLabel htmlFor="reason" value="Reason" />
                    <textarea
                        id="reason"
                        className="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm h-32"
                        value={data.reason}
                        onChange={(e) => setData('reason', e.target.value)}
                        required
                    />
                    <InputError message={errors.reason} className="mt-2" />
                </div>

                {/* Status / Approval Section for Admins/Managers */}
                {isApprovable && (
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                        <h3 className="text-sm font-medium text-purple-900 mb-2">Approval Action</h3>
                        <div className="flex gap-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="status"
                                    value="pending"
                                    checked={data.status === 'pending'}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="text-purple-600 focus:ring-purple-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">Pending</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="status"
                                    value="approved"
                                    checked={data.status === 'approved'}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="text-purple-600 focus:ring-purple-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">Approve</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="status"
                                    value="rejected"
                                    checked={data.status === 'rejected'}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="text-purple-600 focus:ring-purple-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">Reject</span>
                            </label>
                        </div>
                    </div>
                )}
            </form>
        </FormPageLayout>
    );
}
