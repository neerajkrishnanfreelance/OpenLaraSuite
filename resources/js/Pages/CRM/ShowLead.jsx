import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import StatusBadge from '@/Components/StatusBadge';
import PriorityLabel from '@/Components/PriorityLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import SearchableSelect from '@/Components/SearchableSelect';
import ScheduledActivities from '@/Components/ScheduledActivities';
import Chatter from '@/Components/Chatter';
import { ChevronLeft, Briefcase } from 'lucide-react';

export default function ShowLead({ auth, lead, contacts = [], lead_stages = [], media = [], users = [] }) {
    const { data, setData, put, processing, errors } = useForm({
        title: lead.title || '',
        description: lead.description || '',
        contact_id: lead.contact_id || '',
        contact_name: lead.contact_name || '',
        email: lead.email || '',
        phone: lead.phone || '',
        company: lead.company || '',
        lead_stage_id: lead.lead_stage_id || '',
        expected_revenue: lead.expected_revenue || '',
        source: lead.source || '',
        medium_id: lead.medium_id || '',
        priority: lead.priority || 'medium',
        status: lead.status || 'new',
        assigned_to: lead.assigned_to || '',
        expected_close_date: lead.expected_close_date || '',
        notes: lead.notes || '',
    });

    const updateLead = (e) => {
        e.preventDefault();
        put(route('crm.leads.update', lead.id), {
            preserveScroll: true,
        });
    };

    const convertToProject = () => {
        if (confirm('Are you sure you want to convert this lead to a project? The lead will be marked as Won.')) {
            router.post(route('crm.leads.convert-to-project', lead.id));
        }
    };

    const sourceOptions = [
        { id: 'LinkedIn', name: 'LinkedIn' },
        { id: 'Website', name: 'Website' },
        { id: 'Referral', name: 'Referral' },
        { id: 'Cold Call', name: 'Cold Call' },
        { id: 'Email', name: 'Email' },
        { id: 'Social Media', name: 'Social Media' },
        { id: 'Other', name: 'Other' },
    ];

    const statusOptions = [
        { id: 'new', name: 'New' },
        { id: 'contacted', name: 'Contacted' },
        { id: 'qualified', name: 'Qualified' },
        { id: 'proposal', name: 'Proposal' },
        { id: 'negotiation', name: 'Negotiation' },
        { id: 'won', name: 'Won' },
        { id: 'lost', name: 'Lost' },
    ];

    const priorityOptions = [
        { id: 'low', name: 'Low' },
        { id: 'medium', name: 'Medium' },
        { id: 'high', name: 'High' },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Link href={route('crm.leads')} className="mr-4 text-purple-600 hover:text-purple-800 transition flex items-center">
                            <ChevronLeft className="w-5 h-5 mr-1" />
                            Back to Leads
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`Lead: ${lead.title}`} />

            <div className="bg-white border-b border-gray-200 px-8 py-4 mb-6 flex justify-between items-center sticky top-0 z-10 shadow-sm">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h2 className="font-bold text-2xl text-gray-800 leading-tight">
                            {lead.title}
                        </h2>
                        <StatusBadge status={lead.status} />
                        <PriorityLabel priority={lead.priority} />
                    </div>
                    {lead.company && (
                        <p className="text-sm text-gray-600">{lead.company}</p>
                    )}
                </div>
                <div className="flex space-x-3">
                    {lead.status !== 'won' && lead.status !== 'lost' && (
                        <button
                            onClick={convertToProject}
                            className="bg-green-600 border border-transparent text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition flex items-center gap-2"
                        >
                            <Briefcase className="w-4 h-4" />
                            Convert to Project
                        </button>
                    )}
                    <PrimaryButton onClick={updateLead} disabled={processing} className="bg-indigo-600 hover:bg-indigo-700">
                        Save Changes
                    </PrimaryButton>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Lead Information */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">Lead Information</h3>
                            <form onSubmit={updateLead}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <InputLabel forInput="title" value="Lead Title *" />
                                        <TextInput
                                            id="title"
                                            className="mt-1 block w-full"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.title} className="mt-2" />
                                    </div>

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
                                        <InputLabel forInput="contact_name" value="Contact Name" />
                                        <TextInput
                                            id="contact_name"
                                            className="mt-1 block w-full"
                                            value={data.contact_name}
                                            onChange={(e) => setData('contact_name', e.target.value)}
                                        />
                                        <InputError message={errors.contact_name} className="mt-2" />
                                    </div>

                                    <div>
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

                                    <div>
                                        <InputLabel forInput="phone" value="Phone" />
                                        <TextInput
                                            id="phone"
                                            className="mt-1 block w-full"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                        />
                                        <InputError message={errors.phone} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel forInput="company" value="Company" />
                                        <TextInput
                                            id="company"
                                            className="mt-1 block w-full"
                                            value={data.company}
                                            onChange={(e) => setData('company', e.target.value)}
                                        />
                                        <InputError message={errors.company} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel forInput="expected_revenue" value="Expected Revenue ($)" />
                                        <TextInput
                                            id="expected_revenue"
                                            type="number"
                                            step="0.01"
                                            className="mt-1 block w-full"
                                            value={data.expected_revenue}
                                            onChange={(e) => setData('expected_revenue', e.target.value)}
                                        />
                                        <InputError message={errors.expected_revenue} className="mt-2" />
                                    </div>

                                    <div>
                                        <SearchableSelect
                                            label="Lead Stage"
                                            options={lead_stages}
                                            value={data.lead_stage_id}
                                            onChange={(val) => setData('lead_stage_id', val)}
                                            placeholder="Select Stage"
                                        />
                                        <InputError message={errors.lead_stage_id} className="mt-2" />
                                    </div>

                                    <div>
                                        <SearchableSelect
                                            label="Status *"
                                            options={statusOptions}
                                            value={data.status}
                                            onChange={(val) => setData('status', val)}
                                        />
                                        <InputError message={errors.status} className="mt-2" />
                                    </div>

                                    <div>
                                        <SearchableSelect
                                            label="Priority *"
                                            options={priorityOptions}
                                            value={data.priority}
                                            onChange={(val) => setData('priority', val)}
                                        />
                                        <InputError message={errors.priority} className="mt-2" />
                                    </div>

                                    <div>
                                        <SearchableSelect
                                            label="Source"
                                            options={sourceOptions}
                                            value={data.source}
                                            onChange={(val) => setData('source', val)}
                                            placeholder="Select Source"
                                        />
                                        <InputError message={errors.source} className="mt-2" />
                                    </div>

                                    <div>
                                        <SearchableSelect
                                            label="Medium"
                                            options={media}
                                            value={data.medium_id}
                                            onChange={(val) => setData('medium_id', val)}
                                            placeholder="Select Medium"
                                        />
                                        <InputError message={errors.medium_id} className="mt-2" />
                                    </div>

                                    <div>
                                        <SearchableSelect
                                            label="Assigned To"
                                            options={users}
                                            value={data.assigned_to}
                                            onChange={(val) => setData('assigned_to', val)}
                                            placeholder="Select User"
                                        />
                                        <InputError message={errors.assigned_to} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel forInput="expected_close_date" value="Expected Close Date" />
                                        <TextInput
                                            id="expected_close_date"
                                            type="date"
                                            className="mt-1 block w-full"
                                            value={data.expected_close_date}
                                            onChange={(e) => setData('expected_close_date', e.target.value)}
                                        />
                                        <InputError message={errors.expected_close_date} className="mt-2" />
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

                                    <div className="col-span-1 md:col-span-2">
                                        <InputLabel forInput="notes" value="Notes" />
                                        <textarea
                                            id="notes"
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 min-h-[100px]"
                                            value={data.notes}
                                            onChange={(e) => setData('notes', e.target.value)}
                                        />
                                        <InputError message={errors.notes} className="mt-2" />
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Activities */}
                        <ScheduledActivities
                            task={lead}
                            activities={lead.activities || []}
                        />
                    </div>

                    {/* Right Column: Chatter */}
                    <div className="lg:col-span-1 h-full">
                        <Chatter
                            chatterableId={lead.id}
                            chatterableType="App\\Models\\CrmLead"
                            messages={lead.chatter_messages || []}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
