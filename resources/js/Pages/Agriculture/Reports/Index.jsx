import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function Index({ auth }) {
    const { data, setData, get, processing, errors } = useForm({
        date: new Date().toISOString().split('T')[0],
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
                                    <InputLabel htmlFor="date" value="Select Date" />
                                    <TextInput
                                        id="date"
                                        type="date"
                                        className="mt-1 block w-full"
                                        value={data.date}
                                        onChange={(e) => setData('date', e.target.value)}
                                        required
                                    />
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
