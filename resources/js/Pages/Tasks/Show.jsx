import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import StatusBadge from '@/Components/StatusBadge';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import SearchableSelect from '@/Components/SearchableSelect';
import ScheduledActivities from '@/Components/ScheduledActivities';
import Chatter from '@/Components/Chatter';
import { ChevronLeft } from 'lucide-react';

export default function Show({ auth, task, contacts = [], lead_stages = [] }) {
    const { data, setData, put, post, processing, errors } = useForm({
        contact_id: task.contact_id || '',
        contact_name: task.contact_name || '',
        title: task.title || '', // Project Name
        mobile: task.mobile || '',
        expected_revenue: task.expected_revenue || '',
        lead_stage_id: task.lead_stage_id || '',
        stage: task.stage || '',
        source: task.source || '',
        description: task.description || '',
    });

    const updateLead = (e) => {
        e.preventDefault();
        put(route('tasks.update', task.id), {
            preserveScroll: true,
        });
    };

    const convertToProject = () => {
        if (confirm('Are you sure you want to convert this lead to a project? It will be marked as Won.')) {
            post(route('tasks.convert-to-project', task.id));
        }
    };

    const sourceOptions = [
        { id: 'LinkedIn', name: 'LinkedIn' },
        { id: 'Website', name: 'Website' },
        { id: 'Referral', name: 'Referral' },
        { id: 'Cold Call', name: 'Cold Call' },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Link href={route('tasks.index')} className="mr-4 text-purple-600 hover:text-purple-800 transition flex items-center">
                            <ChevronLeft className="w-5 h-5 mr-1" />
                            Back
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`Lead: ${task.contact_name || task.title}`} />

            <div className="bg-white border-b border-gray-200 px-8 py-4 mb-6 flex justify-between items-center sticky top-0 z-10">
                <h2 className="font-bold text-2xl text-gray-800 leading-tight">
                    {task.contact_name || task.title}
                </h2>
                <div className="flex space-x-3">
                    <SecondaryButton onClick={() => window.history.back()} className="hidden">Cancel</SecondaryButton>
                    <button
                        onClick={convertToProject}
                        className="bg-green-600 border border-transparent text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition"
                    >
                        Convert to Project
                    </button>
                    <PrimaryButton onClick={updateLead} disabled={processing} className="bg-indigo-600 hover:bg-indigo-700">
                        Save
                    </PrimaryButton>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Lead Information */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-6 pb-2">Lead Information</h3>
                            <form onSubmit={updateLead}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <SearchableSelect
                                            label="Contact"
                                            options={contacts}
                                            value={data.contact_id}
                                            onChange={(val) => setData('contact_id', val)}
                                            placeholder="Select Contact"
                                        />
                                        <InputError message={errors.contact_id} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel forInput="title" value="Project Name" />
                                        <TextInput
                                            id="title"
                                            className="mt-1 block w-full"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                        />
                                        <InputError message={errors.title} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel forInput="mobile" value="Mobile" />
                                        <TextInput
                                            id="mobile"
                                            className="mt-1 block w-full"
                                            value={data.mobile}
                                            onChange={(e) => setData('mobile', e.target.value)}
                                        />
                                        <InputError message={errors.mobile} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel forInput="expected_revenue" value="Expected Revenue" />
                                        <TextInput
                                            id="expected_revenue"
                                            type="number"
                                            className="mt-1 block w-full"
                                            value={data.expected_revenue}
                                            onChange={(e) => setData('expected_revenue', e.target.value)}
                                        />
                                        <InputError message={errors.expected_revenue} className="mt-2" />
                                    </div>

                                    <div>
                                        <SearchableSelect
                                            label="Stage"
                                            options={lead_stages}
                                            value={data.lead_stage_id}
                                            onChange={(val) => setData('lead_stage_id', val)}
                                        />
                                        <InputError message={errors.lead_stage_id} className="mt-2" />
                                    </div>

                                    <div>
                                        <SearchableSelect
                                            label="Source"
                                            options={sourceOptions}
                                            value={data.source}
                                            onChange={(val) => setData('source', val)}
                                        />
                                        <InputError message={errors.source} className="mt-2" />
                                    </div>

                                    <div className="col-span-1 md:col-span-2">
                                        <InputLabel forInput="description" value="Description" />
                                        <textarea
                                            id="description"
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 min-h-[100px]"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                        />
                                        <InputError message={errors.description} className="mt-2" />
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Activities */}
                        <ScheduledActivities task={task} activities={task.activities || []} />
                    </div>

                    {/* Right Column: Chatter */}
                    <div className="lg:col-span-1 h-full">
                        <Chatter task={task} messages={task.chatter_messages || []} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
