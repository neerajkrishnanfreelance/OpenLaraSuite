import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function JournalLedger({ auth, journals, selectedJournal, entries, startDate, endDate }) {
    const { data, setData, get } = useForm({
        journal_id: selectedJournal?.id || '',
        start_date: startDate,
        end_date: endDate,
    });

    const handleFilter = (e) => {
        e.preventDefault();
        get(route('accounting.reports.journal-ledger'), {
            preserveState: true,
        });
    };

    const totalDebit = entries ? entries.reduce((sum, entry) => sum + entry.total_debit, 0) : 0;
    const totalCredit = entries ? entries.reduce((sum, entry) => sum + entry.total_credit, 0) : 0;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Journal Ledger
                </h2>
            }
        >
            <Head title="Journal Ledger" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        {/* Filters */}
                        <form onSubmit={handleFilter} className="flex gap-4 items-end mb-6">
                            <div className="w-1/3">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Journal</label>
                                <select
                                    value={data.journal_id}
                                    onChange={(e) => setData('journal_id', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">Select Journal</option>
                                    {journals.map(journal => (
                                        <option key={journal.id} value={journal.id}>{journal.name} ({journal.code})</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                <input
                                    type="date"
                                    value={data.start_date}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                <input
                                    type="date"
                                    value={data.end_date}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                            >
                                Filter
                            </button>
                        </form>

                        {/* Report Content */}
                        {selectedJournal ? (
                            <div>
                                <div className="mb-6 pb-6 border-b border-gray-200">
                                    <h1 className="text-2xl font-bold text-gray-900">{selectedJournal.name}</h1>
                                    <p className="text-gray-600">
                                        Period: {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
                                    </p>
                                </div>

                                {entries && entries.length > 0 ? (
                                    <div className="space-y-6">
                                        {entries.map(entry => (
                                            <div key={entry.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900">
                                                            {new Date(entry.date).toLocaleDateString()} - {entry.reference || 'No Reference'}
                                                        </h3>
                                                        <p className="text-sm text-gray-600">{entry.notes || 'No notes'}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className={`px-2 py-1 text-xs rounded-full ${entry.state === 'posted'
                                                                ? 'bg-green-100 text-green-700'
                                                                : 'bg-yellow-100 text-yellow-700'
                                                            }`}>
                                                            {entry.state.toUpperCase()}
                                                        </span>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            Entry #{entry.id}
                                                        </p>
                                                    </div>
                                                </div>

                                                <table className="min-w-full text-sm">
                                                    <thead>
                                                        <tr className="text-gray-500 border-b border-gray-200">
                                                            <th className="text-left font-normal py-1">Account</th>
                                                            <th className="text-left font-normal py-1">Type</th>
                                                            <th className="text-left font-normal py-1">Description</th>
                                                            <th className="text-right font-normal py-1">Debit</th>
                                                            <th className="text-right font-normal py-1">Credit</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {entry.lines.map((line, index) => (
                                                            <tr key={index}>
                                                                <td className="py-1">
                                                                    <Link
                                                                        href={`/accounting/accounts/${line.account_id}`}
                                                                        className="text-indigo-600 hover:text-indigo-800"
                                                                    >
                                                                        {line.account.code} - {line.account.name}
                                                                    </Link>
                                                                </td>
                                                                <td className="py-1 text-gray-500">{line.account.account_type}</td>
                                                                <td className="py-1 text-gray-600">{line.description}</td>
                                                                <td className="py-1 text-right">{line.debit > 0 ? `$${parseFloat(line.debit).toLocaleString()}` : '-'}</td>
                                                                <td className="py-1 text-right">{line.credit > 0 ? `$${parseFloat(line.credit).toLocaleString()}` : '-'}</td>
                                                            </tr>
                                                        ))}
                                                        <tr className="border-t border-gray-100 font-medium bg-gray-50">
                                                            <td colSpan="3" className="py-1 text-right pr-4">Total</td>
                                                            <td className="py-1 text-right">${entry.lines.reduce((s, l) => s + parseFloat(l.debit), 0).toLocaleString()}</td>
                                                            <td className="py-1 text-right">${entry.lines.reduce((s, l) => s + parseFloat(l.credit), 0).toLocaleString()}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-gray-500 py-8">No entries found for this period.</p>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">Please select a journal to view its ledger.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
