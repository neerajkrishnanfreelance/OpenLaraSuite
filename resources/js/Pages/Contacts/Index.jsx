import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { Plus, Search, Edit, Trash2, Mail, Phone, ExternalLink } from 'lucide-react';
import Pagination from '@/Components/Pagination';

import StatusBadge from '@/Components/StatusBadge';

export default function Index({ auth, contacts, filters, users = [] }) {
    const { flash } = usePage().props;

    const [search, setSearch] = React.useState(filters.search || '');
    const [status, setStatus] = React.useState(filters.status || '');
    const [assignedTo, setAssignedTo] = React.useState(filters.assigned_to || '');

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        router.get(route('contacts.index'), { search, status, assigned_to: assignedTo }, { preserveState: true, replace: true });
    };

    // Trigger search on filter change
    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (status !== (filters.status || '') || assignedTo !== (filters.assigned_to || '')) {
                handleSearch();
            }
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [status, assignedTo]);


    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this contact?')) {
            router.delete(route('contacts.destroy', id), {
                onSuccess: () => {
                    // Flash handled globally usually
                }
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Contacts</h2>}
        >
            <Head title="Contacts" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                

                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <form onSubmit={handleSearch} className="flex flex-wrap gap-2 w-full md:w-auto">
                            <div className="relative text-gray-600 focus-within:text-gray-400">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                    <Search className="h-5 w-5" />
                                </span>
                                <input
                                    type="text"
                                    name="search"
                                    className="py-2 text-sm text-gray-900 bg-white rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onBlur={handleSearch}
                                />
                            </div>

                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="py-2 text-sm text-gray-900 bg-white rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">All Statuses</option>
                                <option value="prospect">Prospect</option>
                                <option value="active">Active</option>
                                <option value="converted">Converted</option>
                                <option value="lost">Lost</option>
                            </select>

                            <select
                                value={assignedTo}
                                onChange={(e) => setAssignedTo(e.target.value)}
                                className="py-2 text-sm text-gray-900 bg-white rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">All Assigned</option>
                                {users.map(u => (
                                    <option key={u.id} value={u.id}>{u.name}</option>
                                ))}
                            </select>

                            <button type="submit" className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition">
                                Filter
                            </button>
                        </form>

                        <Link
                            href={route('contacts.create')}
                            className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300 disabled:opacity-25 transition ease-in-out duration-150"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Contact
                        </Link>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Contact Info
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Assigned To
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Hourly Rate
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {contacts.data.length > 0 ? (
                                        contacts.data.map((contact) => (
                                            <tr key={contact.id} className="hover:bg-gray-50 transition">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 font-bold text-lg">
                                                                {contact.name.charAt(0)}
                                                            </div>
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                <Link href={route('contacts.show', contact.id)} className="hover:text-indigo-600 hover:underline">
                                                                    {contact.name}
                                                                </Link>
                                                            </div>
                                                            <div className="text-xs text-gray-500">{contact.company || ''}</div>
                                                        </div>
                                                    </div>
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
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {contact.assigned_user ? contact.assigned_user.name : <span className="text-gray-400 italic">Unassigned</span>}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                                                    {contact.hourly_rate ? `$${contact.hourly_rate}/hr` : '-'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link
                                                        href={route('contacts.show', contact.id)}
                                                        className="text-gray-600 hover:text-gray-900 mr-4 inline-flex items-center"
                                                        title="View Dashboard"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                    </Link>
                                                    <Link
                                                        href={route('contacts.edit', contact.id)}
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
                                            <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                                                No contacts found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <Pagination class="mt-6" links={contacts.links} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
