import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import SearchableSelect from '@/Components/SearchableSelect';
import { ChevronLeft } from 'lucide-react';

export default function CreateLead({ auth, contacts, lead_stages, media, users }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        contact_id: '',
        contact_name: '',
        email: '',
        phone: '',
        company: '',
        lead_stage_id: '',
        expected_revenue: '',
        source: '',
        medium_id: '',
        priority: 'medium',
        status: 'new',
        assigned_to: '',
        expected_close_date: '',
        tags: [],
        notes: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('crm.leads.store'));
    };

    const sourceOptions = [
        { id: 'LinkedIn', name: 'LinkedIn' },
        { id: 'Website', name: 'Website' },
        { id: 'Referral', name: 'Referral' },
        { id: 'Cold Call', name: 'Cold Call' },
        { id: 'Email Campaign', name: 'Email Campaign' },
        { id: 'Social Media', name: 'Social Media' },
        { id: 'Trade Show', name: 'Trade Show' },
        { id: 'Other', name: 'Other' },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center">
                    <Link href={route('crm.leads')} className="mr-4 text-purple-600 hover:text-purple-800 transition flex items-center">
                        <ChevronLeft className="w-5 h-5 mr-1" />
                        Back to Leads
                    </Link>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Create New Lead</h2>
                </div>
            }
        >
            <Head title="Create Lead" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={handleSubmit} className="p-6">
                            {/* Lead Information Section */}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b">Lead Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <InputLabel forInput="title" value="Lead Title *" />
                                        <TextInput
                                            id="title"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.title} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel forInput="priority" value="Priority *" />
                                        <select
                                            id="priority"
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            value={data.priority}
                                            onChange={(e) => setData('priority', e.target.value)}
                                            required
                                        >
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                        </select>
                                        <InputError message={errors.priority} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel forInput="status" value="Status *" />
                                        <select
                                            id="status"
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            required
                                        >
                                            <option value="new">New</option>
                                            <option value="contacted">Contacted</option>
                                            <option value="qualified">Qualified</option>
                                            <option value="proposal">Proposal</option>
                                            <option value="negotiation">Negotiation</option>
                                            <option value="won">Won</option>
                                            <option value="lost">Lost</option>
                                        </select>
                                        <InputError message={errors.status} className="mt-2" />
                                    </div>

                                    <div>
                                        <SearchableSelect
                                            label="Lead Stage"
                                            options={lead_stages}
                                            value={data.lead_stage_id}
                                            onChange={(val) => setData('lead_stage_id', val)}
                                            placeholder="Select Lead Stage"
                                        />
                                        <InputError message={errors.lead_stage_id} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel forInput="expected_revenue" value="Expected Revenue" />
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

                                    <div className="md:col-span-2">
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
                            </div>

                            {/* Contact Information Section */}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b">Contact Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <SearchableSelect
                                            label="Existing Contact"
                                            options={contacts}
                                            value={data.contact_id}
                                            onChange={(val) => setData('contact_id', val)}
                                            placeholder="Select Contact (Optional)"
                                        />
                                        <InputError message={errors.contact_id} className="mt-2" />
                                        <p className="text-xs text-gray-500 mt-1">Or fill in the details below for a new contact</p>
                                    </div>

                                    <div>
                                        <InputLabel forInput="contact_name" value="Contact Name" />
                                        <TextInput
                                            id="contact_name"
                                            type="text"
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
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                        />
                                        <InputError message={errors.phone} className="mt-2" />
                                    </div>

                                    <div className="md:col-span-2">
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
                                </div>
                            </div>

                            {/* Source & Additional Info Section */}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b">Source & Additional Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                            label="Media/Channel"
                                            options={media}
                                            value={data.medium_id}
                                            onChange={(val) => setData('medium_id', val)}
                                            placeholder="Select Media Channel"
                                        />
                                        <InputError message={errors.medium_id} className="mt-2" />
                                    </div>

                                    <div className="md:col-span-2">
                                        <InputLabel forInput="notes" value="Notes" />
                                        <textarea
                                            id="notes"
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 min-h-[100px]"
                                            value={data.notes}
                                            onChange={(e) => setData('notes', e.target.value)}
                                            placeholder="Add any additional notes about this lead..."
                                        />
                                        <InputError message={errors.notes} className="mt-2" />
                                    </div>
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="flex items-center justify-end gap-4 pt-6 border-t">
                                <Link href={route('crm.leads')}>
                                    <SecondaryButton type="button">
                                        Cancel
                                    </SecondaryButton>
                                </Link>
                                <PrimaryButton type="submit" disabled={processing}>
                                    {processing ? 'Creating...' : 'Create Lead'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
