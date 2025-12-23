import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { Plus, Edit, Trash2, Mail, Phone, Send, ExternalLink } from 'lucide-react';
import StatusBadge from '@/Components/StatusBadge';

export default function Index({ auth, contacts }) {
    const { flash } = usePage().props;
    const [selectedIds, setSelectedIds] = useState([]);

    const toggleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(contacts.map(c => c.id));
        } else {
            setSelectedIds([]);
        }
    };

    const toggleSelect = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this contact?')) {
            router.delete(route('hr-contacts.destroy', id), {
                onSuccess: () => {
                    // Flash handled globally usually
                }
            });
        }
    };

    const handleBulkDelete = () => {
        if (confirm(`Are you sure you want to delete ${selectedIds.length} contact(s)?`)) {
            router.post(route('hr-contacts.bulk-delete'), { ids: selectedIds }, {
                onSuccess: () => {
                    setSelectedIds([]);
                }
            });
        }
    };

    const handleSendWelcome = (id) => {
        if (confirm('Are you sure you want to send the welcome email?')) {
            router.post(route('hr-contacts.send-welcome', id), {}, {
                onSuccess: () => alert('Welcome email sent!'),
                onError: () => alert('Failed to send email.')
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">HR Contacts</h2>}
        >
            <Head title="HR Contacts" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">


                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <div className="flex-1 flex gap-2">
                            {selectedIds.length > 0 && (
                                <button
                                    onClick={handleBulkDelete}
                                    className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 active:bg-red-900 focus:outline-none focus:border-red-900 focus:ring ring-red-300 disabled:opacity-25 transition ease-in-out duration-150"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete Selected ({selectedIds.length})
                                </button>
                            )}
                        </div>
                        <Link
                            href={route('hr-contacts.create')}
                            className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300 disabled:opacity-25 transition ease-in-out duration-150"
                        >
                            Add HR Contact
                        </Link>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                checked={contacts.length > 0 && selectedIds.length === contacts.length}
                                                onChange={toggleSelectAll}
                                            />
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Company / Position
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Contact Info
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {contacts.length > 0 ? (
                                        contacts.map((contact) => (
                                            <tr key={contact.id} className="hover:bg-gray-50 transition">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                        checked={selectedIds.includes(contact.id)}
                                                        onChange={() => toggleSelect(contact.id)}
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-lg">
                                                                {contact.name.charAt(0)}
                                                            </div>
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {contact.name}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{contact.company || '-'}</div>
                                                    <div className="text-xs text-gray-500">{contact.position || '-'}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <StatusBadge status={contact.status} />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900 flex items-center mb-1">
                                                        <Mail className="w-3 h-3 mr-2 text-gray-400" />
                                                        {contact.email || '-'}
                                                    </div>
                                                    <div className="text-sm text-gray-500 flex items-center">
                                                        <Phone className="w-3 h-3 mr-2 text-gray-400" />
                                                        {contact.phone || '-'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => handleSendWelcome(contact.id)}
                                                        className="text-blue-600 hover:text-blue-900 mr-4 inline-flex items-center"
                                                        title="Send Welcome Email"
                                                    >
                                                        <Send className="w-4 h-4" />
                                                    </button>
                                                    <Link
                                                        href={route('hr-contacts.edit', contact.id)}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-4 inline-flex items-center"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(contact.id)}
                                                        className="text-red-600 hover:text-red-900 inline-flex items-center"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                                                No HR contacts found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
