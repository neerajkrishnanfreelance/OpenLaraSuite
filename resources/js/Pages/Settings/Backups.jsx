import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Download, Trash2, Database, AlertCircle, HardDrive, RefreshCw, Server, RotateCcw } from 'lucide-react';
import React, { useState } from 'react';

export default function Backups({ auth, backups }) {
    const { flash } = usePage().props;
    const [activeTab, setActiveTab] = useState('backup');
    const [selectedConnection, setSelectedConnection] = useState('pgsql');

    // Forms
    const createForm = useForm({
        connection: 'pgsql'
    });

    const restoreForm = useForm({
        connection: 'pgsql'
    });

    const deleteForm = useForm();

    const handleCreateBackup = (e) => {
        e.preventDefault();
        createForm.setData('connection', selectedConnection);
        createForm.post(route('backups.store'), {
            onSuccess: () => {
                // Flash message handling if needed
            }
        });
    };

    const handleRestoreBackup = (fileName) => {
        if (confirm(`Are you sure you want to OVERWRITE the "${selectedConnection}" database with this backup? This action cannot be undone.`)) {
            restoreForm.setData('connection', selectedConnection);
            restoreForm.post(route('backups.restore', fileName));
        }
    };

    const handleDeleteBackup = (name) => {
        if (confirm('Are you sure you want to delete this backup?')) {
            deleteForm.delete(route('backups.destroy', name));
        }
    };

    const connections = [
        { id: 'pgsql', name: 'PostgreSQL (Default)' },
        { id: 'mysql', name: 'MySQL' },
        { id: 'sqlite', name: 'SQLite' },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Database Backups</h2>}
        >
            <Head title="Backups" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* Status Messages */}
 

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex min-h-[500px]">

                        {/* Sidebar */}
                        <div className="w-1/4 bg-gray-50 border-r border-gray-200 p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-6">Operations</h3>
                            <nav className="space-y-2">
                                <button
                                    onClick={() => setActiveTab('backup')}
                                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'backup'
                                            ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    <Database className="w-5 h-5 mr-3" />
                                    Backup Database
                                </button>
                                <button
                                    onClick={() => setActiveTab('restore')}
                                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'restore'
                                            ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    <RotateCcw className="w-5 h-5 mr-3" />
                                    Restore Database
                                </button>
                            </nav>

                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Target Connection</h4>
                                <div className="space-y-2">
                                    {connections.map((conn) => (
                                        <label key={conn.id} className="flex items-center space-x-3 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="connection"
                                                value={conn.id}
                                                checked={selectedConnection === conn.id}
                                                onChange={(e) => setSelectedConnection(e.target.value)}
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                            />
                                            <span className="text-sm text-gray-700">{conn.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="w-3/4 p-8">
                            {activeTab === 'backup' ? (
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Backup</h3>
                                    <p className="text-gray-500 mb-8">
                                        Create a full backup of your <strong>{connections.find(c => c.id === selectedConnection)?.name}</strong> database.
                                        The backup file will be stored securely on the server.
                                    </p>

                                    <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-8">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <AlertCircle className="h-5 w-5 text-blue-400" />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm text-blue-700">
                                                    Automated backups keep the last 7 backups by default.
                                                    Backups created manually here are preserved until deleted.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleCreateBackup}
                                        disabled={createForm.processing}
                                        className="inline-flex items-center px-6 py-3 bg-indigo-600 border border-transparent rounded-md font-semibold text-base text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50"
                                    >
                                        {createForm.processing ? (
                                            <>
                                                <RefreshCw className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <Database className="-ml-1 mr-3 h-5 w-5" />
                                                Create Backup Now
                                            </>
                                        )}
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Restore Database</h3>
                                    <p className="text-gray-500 mb-6">
                                        Select a backup file to restore to the <strong>{connections.find(c => c.id === selectedConnection)?.name}</strong> database.
                                    </p>

                                    <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-8">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <AlertCircle className="h-5 w-5 text-red-500" />
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="text-sm font-medium text-red-800">Warning: Destructive Action</h3>
                                                <div className="mt-2 text-sm text-red-700">
                                                    <p>
                                                        Restoring a database will <strong>overwrite all existing data</strong> in the selected connection.
                                                        Make sure you have a current backup before proceeding.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="overflow-hidden border border-gray-200 sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Backup File
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Details
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {backups.length > 0 ? (
                                                    backups.map((backup) => (
                                                        <tr key={backup.name} className="hover:bg-gray-50">
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                                                        <Server className="h-5 w-5 text-indigo-600" />
                                                                    </div>
                                                                    <div className="ml-4">
                                                                        <div className="text-sm font-medium text-gray-900">{backup.name}</div>
                                                                        <div className="text-xs text-gray-500">System Backup</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-sm text-gray-900">{backup.date}</div>
                                                                <div className="text-xs text-gray-500">{backup.size}</div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                <div className="flex justify-end space-x-3">
                                                                    <a
                                                                        href={route('backups.download', backup.name)}
                                                                        className="text-gray-400 hover:text-gray-600"
                                                                        title="Download"
                                                                    >
                                                                        <Download className="h-5 w-5" />
                                                                    </a>
                                                                    <button
                                                                        onClick={() => handleDeleteBackup(backup.name)}
                                                                        className="text-gray-400 hover:text-red-600"
                                                                        title="Delete"
                                                                    >
                                                                        <Trash2 className="h-5 w-5" />
                                                                    </button>
                                                                    <span className="text-gray-300">|</span>
                                                                    <button
                                                                        onClick={() => handleRestoreBackup(backup.name)}
                                                                        disabled={restoreForm.processing}
                                                                        className="text-indigo-600 hover:text-indigo-900 font-semibold"
                                                                    >
                                                                        Restore
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="3" className="px-6 py-10 text-center text-gray-500">
                                                            <div className="flex flex-col items-center justify-center">
                                                                <HardDrive className="h-10 w-10 text-gray-300 mb-2" />
                                                                <p>No backups available yet.</p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
