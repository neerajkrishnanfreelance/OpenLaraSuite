import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import StatusBadge from '@/Components/StatusBadge';
import PriorityLabel from '@/Components/PriorityLabel';
import ClickableLink from '@/Components/ClickableLink';
import { Mail, Phone, MapPin, Building, Briefcase, Calendar, Edit, MoveRight, User, DollarSign } from 'lucide-react';

export default function Show({ auth, contact, users }) {
    const [activeTab, setActiveTab] = useState('details'); // details, leads, activities, notes

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 leading-tight flex items-center gap-2">
                    <Link href={route('contacts.index')} className="text-gray-400 hover:text-gray-600">
                        Contacts
                    </Link>
                    <span className="text-gray-300">/</span>
                    {contact.name}
                </h2>
                <Link
                    href={route('contacts.edit', contact.id)}
                    className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium"
                >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Contact
                </Link>
            </div>}
        >
            <Head title={`Contact: ${contact.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* Top Card */}
                    <div className="bg-white shadow-sm rounded-lg p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-2xl border-2 border-indigo-200">
                                {contact.name.charAt(0)}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{contact.name}</h1>
                                <p className="text-gray-500 flex items-center gap-2 mt-1">
                                    {contact.company && <><Building className="w-4 h-4" /> {contact.company}</>}
                                    {contact.company && contact.description && <span>•</span>}
                                    <span className="text-sm">{contact.description}</span>
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex flex-col items-end gap-2">
                            <StatusBadge status={contact.status} />
                            <div className="text-sm text-gray-500">
                                Assigned to: <span className="font-medium text-gray-700">{contact.assigned_user?.name || 'Unassigned'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Sidebar Info */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white shadow-sm rounded-lg p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Contact Details</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase">Email</p>
                                            <a href={`mailto:${contact.email}`} className="text-indigo-600 hover:underline">{contact.email || '-'}</a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase">Phone</p>
                                            <a href={`tel:${contact.phone}`} className="text-gray-700 hover:text-gray-900">{contact.phone || '-'}</a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase">Address</p>
                                            <p className="text-gray-700 whitespace-pre-wrap">{contact.address || '-'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <DollarSign className="w-5 h-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase">Hourly Rate</p>
                                            <p className="text-gray-700 font-mono">{contact.hourly_rate ? `$${contact.hourly_rate}` : '-'}</p>
                                        </div>
                                    </div>
                                    {contact.source && (
                                        <div className="flex items-start gap-3">
                                            <Briefcase className="w-5 h-5 text-gray-400 mt-0.5" />
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase">Source</p>
                                                <p className="text-gray-700">{contact.source}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Tags or Meta */}
                            <div className="bg-white shadow-sm rounded-lg p-6">
                                <h3 className="text-sm font-medium text-gray-900 mb-4">Metadata</h3>
                                <div className="text-sm text-gray-500 space-y-2">
                                    <div className="flex justify-between">
                                        <span>Created By:</span>
                                        <span>{contact.creator?.name || 'System'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Created At:</span>
                                        <span>{new Date(contact.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content Tabs */}
                        <div className="lg:col-span-2">
                            <div className="bg-white shadow-sm rounded-lg overflow-hidden min-h-[500px]">
                                <div className="border-b border-gray-200">
                                    <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
                                        <button
                                            onClick={() => setActiveTab('leads')}
                                            className={`${activeTab === 'leads' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                                        >
                                            Leads / Tasks
                                        </button>
                                        {/* Future tabs: Activities, Notes, Files */}
                                    </nav>
                                </div>

                                <div className="p-6">
                                    {activeTab === 'leads' && (
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="text-lg font-medium text-gray-900">Leads & Tasks</h3>
                                                <Link href={route('tasks.create', { contact_id: contact.id })}>
                                                    <span className="text-sm text-indigo-600 hover:underline">+ New Lead</span>
                                                </Link>
                                            </div>

                                            {contact.tasks && contact.tasks.length > 0 ? (
                                                <div className="space-y-4">
                                                    {contact.tasks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map(task => (
                                                        <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition bg-gray-50">
                                                            <div className="flex justify-between items-start">
                                                                <div>
                                                                    <div className="flex items-center gap-2">
                                                                        <PriorityLabel priority={task.priority} />
                                                                        {task.lead_stage && (
                                                                            <span className="text-xs px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: task.lead_stage.color || '#6366f1' }}>
                                                                                {task.lead_stage.name}
                                                                            </span>
                                                                        )}
                                                                        <ClickableLink routeName="tasks.show" params={task.id} className="text-lg font-semibold text-gray-900 hover:text-indigo-600">
                                                                            {task.title}
                                                                        </ClickableLink>
                                                                    </div>
                                                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{task.description}</p>
                                                                </div>
                                                                <div className="text-right text-xs text-gray-500">
                                                                    <div>{new Date(task.created_at).toLocaleDateString()}</div>
                                                                    <div className="mt-1 font-medium">{task.status.replace('_', ' ')}</div>
                                                                </div>
                                                            </div>
                                                            <div className="mt-3 text-xs text-gray-500 flex justify-between items-center">
                                                                <span>Assigned to: {task.assigned_user?.name || 'Unassigned'}</span>
                                                                {task.expected_revenue && <span className="font-mono text-green-600 font-bold">${task.expected_revenue}</span>}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-gray-500 text-sm text-center py-8">No leads associated with this contact.</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
