import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { Pencil, FileCheck, Ban, Trash2, ArrowLeft } from 'lucide-react';

export default function ShowJournalEntry({ auth, entry }) {
    const isDraft = entry.state === 'draft';
    const isPosted = entry.state === 'posted';
    const isCancelled = entry.state === 'cancelled';

    const handlePost = () => {
        if (confirm('Are you sure you want to post this entry? This cannot be undone.')) {
            router.post(route('accounting.entries.post', entry.id));
        }
    };

    const handleCancel = () => {
        if (confirm('Are you sure you want to cancel (void) this entry?')) {
            router.post(route('accounting.entries.cancel', entry.id));
        }
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this entry?')) {
            router.delete(route('accounting.entries.destroy', entry.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight flex items-center gap-2">
                        <a href={route('accounting.entries.index')} className="text-gray-500 hover:text-gray-700">
                            <ArrowLeft className="w-5 h-5" />
                        </a>
                        Journal Entry #{entry.id}
                    </h2>
                    <div className="flex gap-2">
                        {isDraft && (
                            <>
                                <a
                                    href={route('accounting.entries.edit', entry.id)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                                >
                                    <Pencil className="w-4 h-4" /> Edit
                                </a>
                                <button
                                    onClick={handlePost}
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
                                >
                                    <FileCheck className="w-4 h-4" /> Post
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 flex items-center gap-2"
                                >
                                    <Ban className="w-4 h-4" /> Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2"
                                >
                                    <Trash2 className="w-4 h-4" /> Delete
                                </button>
                            </>
                        )}
                        {!isDraft && (
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center ${isPosted ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                State: {entry.state.toUpperCase()}
                            </span>
                        )}
                    </div>
                </div>
            }
        >
            <Head title={`Entry #${entry.id}`} />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6 border-b border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Journal</p>
                                    <p className="text-lg text-gray-900">{entry.journal?.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Reference</p>
                                    <p className="text-lg text-gray-900">{entry.reference || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Date</p>
                                    <p className="text-lg text-gray-900">{new Date(entry.date).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Created By</p>
                                    <p className="text-lg text-gray-900">{entry.created_by?.name || 'Unknown'}</p>
                                </div>
                            </div>
                            {entry.notes && (
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-gray-500">Notes</p>
                                    <p className="text-gray-900">{entry.notes}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <h3 className="font-semibold text-gray-900">Line Items</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Debit</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Credit</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {entry.lines && entry.lines.map((line) => (
                                        <tr key={line.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                                {line.account?.code} - {line.account?.name}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {line.description}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                                                {parseFloat(line.debit) !== 0 ? `$${parseFloat(line.debit).toFixed(2)}` : '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                                                {parseFloat(line.credit) !== 0 ? `$${parseFloat(line.credit).toFixed(2)}` : '-'}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className="bg-gray-50 font-semibold border-t-2 border-gray-200">
                                        <td colSpan="2" className="px-6 py-4 text-right text-sm text-gray-900">Totals:</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                                            ${entry.lines?.reduce((sum, line) => sum + parseFloat(line.debit || 0), 0).toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                                            ${entry.lines?.reduce((sum, line) => sum + parseFloat(line.credit || 0), 0).toFixed(2)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
