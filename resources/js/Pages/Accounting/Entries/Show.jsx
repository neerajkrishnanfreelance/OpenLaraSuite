import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { Pencil, FileCheck, Ban, Trash2, ArrowLeft, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function ShowJournalEntry({ auth, entry }) {
    const isDraft = entry.state === 'draft';
    const isPosted = entry.state === 'posted';
    const isCancelled = entry.state === 'cancelled';

    // Status Steps Logic
    const steps = [
        { id: 'draft', label: 'Draft', icon: Clock },
        { id: 'final', label: isCancelled ? 'Cancelled' : 'Posted', icon: isCancelled ? XCircle : CheckCircle }, // Dynamic second step
    ];

    const getCurrentStepIndex = () => {
        if (isDraft) return 0;
        return 1; // Both Posted and Cancelled are step 1 (final)
    };

    const currentStepIndex = getCurrentStepIndex();

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
                                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center gap-2 shadow-sm"
                                >
                                    <Pencil className="w-4 h-4" /> Edit
                                </a>
                                <button
                                    onClick={handlePost}
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2 shadow-sm"
                                >
                                    <FileCheck className="w-4 h-4" /> Post
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="px-4 py-2 bg-orange-100 text-orange-700 border border-orange-200 rounded-md hover:bg-orange-200 flex items-center gap-2 shadow-sm"
                                >
                                    <Ban className="w-4 h-4" /> Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-md hover:bg-red-50 flex items-center gap-2 shadow-sm"
                                >
                                    <Trash2 className="w-4 h-4" /> Delete
                                </button>
                            </>
                        )}
                    </div>
                </div>
            }
        >
            <Head title={`Entry #${entry.id}`} />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Status Bar */}
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <div className="flex items-center justify-center max-w-2xl mx-auto">
                            {steps.map((step, index) => {
                                const isCompleted = index < currentStepIndex || (index === currentStepIndex && !isDraft); // Draft is "in progress" at index 0
                                const isCurrent = index === currentStepIndex;
                                const StepIcon = step.icon;

                                // Color Logic
                                let colorClass = "text-gray-400 border-gray-300"; // Default pending
                                let lineClass = "bg-gray-300";

                                if (isCancelled) {
                                    if (isCompleted || isCurrent) colorClass = "text-red-600 border-red-600";
                                    lineClass = "bg-red-600";
                                } else if (isPosted) {
                                    if (isCompleted || isCurrent) colorClass = "text-green-600 border-green-600";
                                    lineClass = "bg-green-600";
                                } else {
                                    // Draft
                                    if (index === 0) colorClass = "text-blue-600 border-blue-600";
                                    if (index === 0 && isCurrent) lineClass = "bg-gray-300"; // Line to next step is gray
                                }

                                return (
                                    <div key={step.id} className="flex-1 flex items-center relative">
                                        <div className="flex flex-col items-center relative z-10 w-full">
                                            <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center bg-white ${colorClass}`}>
                                                <StepIcon className="w-6 h-6" />
                                            </div>
                                            <span className={`mt-2 text-sm font-medium ${isCurrent || isCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
                                                {step.label}
                                            </span>
                                        </div>
                                        {index < steps.length - 1 && (
                                            <div className={`absolute top-5 left-1/2 w-full h-1 -translate-y-1/2 -z-0 ${isCompleted ? lineClass : 'bg-gray-300'}`}></div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

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
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                            <h3 className="font-semibold text-gray-900">Line Items</h3>
                            <span className="text-sm text-gray-500">{entry.lines?.length || 0} lines</span>
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
