import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Users, TrendingUp, CheckCircle, DollarSign, Plus, ArrowRight } from 'lucide-react';

export default function Dashboard({ auth, kpis, recentContacts, leadsByStage, recentActivities }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">CRM Dashboard</h2>}
        >
            <Head title="CRM Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Total Contacts */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-l-4 border-blue-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">Total Contacts</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">{kpis.totalContacts}</p>
                                </div>
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <Users className="h-8 w-8 text-blue-600" />
                                </div>
                            </div>
                        </div>

                        {/* Active Leads */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-l-4 border-yellow-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">Active Leads</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">{kpis.activeLeads}</p>
                                </div>
                                <div className="bg-yellow-100 p-3 rounded-full">
                                    <TrendingUp className="h-8 w-8 text-yellow-600" />
                                </div>
                            </div>
                        </div>

                        {/* Converted Leads */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-l-4 border-green-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">Converted Leads</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">{kpis.convertedLeads}</p>
                                </div>
                                <div className="bg-green-100 p-3 rounded-full">
                                    <CheckCircle className="h-8 w-8 text-green-600" />
                                </div>
                            </div>
                        </div>

                        {/* Revenue Pipeline */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-l-4 border-purple-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">Revenue Pipeline</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">${kpis.revenuePipeline?.toLocaleString() || 0}</p>
                                </div>
                                <div className="bg-purple-100 p-3 rounded-full">
                                    <DollarSign className="h-8 w-8 text-purple-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Recent Contacts */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-800">Recent Contacts</h3>
                                <Link
                                    href={route('contacts.index')}
                                    className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
                                >
                                    View All <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            </div>
                            <div className="p-6">
                                {recentContacts && recentContacts.length > 0 ? (
                                    <div className="space-y-4">
                                        {recentContacts.map((contact) => (
                                            <div key={contact.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg mr-3">
                                                        {contact.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <Link
                                                            href={route('contacts.show', contact.id)}
                                                            className="font-medium text-gray-900 hover:text-indigo-600"
                                                        >
                                                            {contact.name}
                                                        </Link>
                                                        <p className="text-xs text-gray-500">{contact.company || 'No company'}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${contact.status === 'active' ? 'bg-green-100 text-green-800' :
                                                            contact.status === 'prospect' ? 'bg-yellow-100 text-yellow-800' :
                                                                contact.status === 'converted' ? 'bg-blue-100 text-blue-800' :
                                                                    'bg-gray-100 text-gray-800'
                                                        }`}>
                                                        {contact.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-center py-8">No recent contacts</p>
                                )}
                            </div>
                        </div>

                        {/* Leads by Stage */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-800">Leads by Stage</h3>
                                <Link
                                    href={route('crm.leads')}
                                    className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
                                >
                                    View Pipeline <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            </div>
                            <div className="p-6">
                                {leadsByStage && leadsByStage.length > 0 ? (
                                    <div className="space-y-3">
                                        {leadsByStage.map((stage, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <div className="flex items-center flex-1">
                                                    <div
                                                        className="w-3 h-3 rounded-full mr-3"
                                                        style={{ backgroundColor: stage.color || '#6366f1' }}
                                                    ></div>
                                                    <span className="text-sm font-medium text-gray-700">{stage.name}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="text-sm font-bold text-gray-900 mr-2">{stage.count}</span>
                                                    <div className="w-24 bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="h-2 rounded-full"
                                                            style={{
                                                                width: `${leadsByStage.reduce((sum, s) => sum + s.count, 0) > 0 ? (stage.count / leadsByStage.reduce((sum, s) => sum + s.count, 0)) * 100 : 0}%`,
                                                                backgroundColor: stage.color || '#6366f1'
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-center py-8">No leads data available</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href={route('contacts.create')}
                                className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300 disabled:opacity-25 transition ease-in-out duration-150"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Contact
                            </Link>
                            <Link
                                href={route('tasks.create')}
                                className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 active:bg-green-900 focus:outline-none focus:border-green-900 focus:ring ring-green-300 disabled:opacity-25 transition ease-in-out duration-150"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Lead
                            </Link>
                            <Link
                                href={route('crm.leads')}
                                className="inline-flex items-center px-4 py-2 bg-purple-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-purple-700 active:bg-purple-900 focus:outline-none focus:border-purple-900 focus:ring ring-purple-300 disabled:opacity-25 transition ease-in-out duration-150"
                            >
                                View Pipeline
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
