import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function EditJournalEntry({ auth, entry, journals, accounts }) {
    const [lines, setLines] = useState(entry.lines.map(line => ({
        ...line,
        debit: parseFloat(line.debit) || 0,
        credit: parseFloat(line.credit) || 0
    })));

    const { data, setData, put, processing } = useForm({
        journal_id: entry.journal_id,
        reference: entry.reference || '',
        date: entry.date,
        notes: entry.notes || '',
        lines: lines,
    });

    const addLine = () => {
        const newLines = [...lines, { account_id: '', description: '', debit: 0, credit: 0 }];
        setLines(newLines);
        setData('lines', newLines);
    };

    const removeLine = (index) => {
        const newLines = lines.filter((_, i) => i !== index);
        setLines(newLines);
        setData('lines', newLines);
    };

    const updateLine = (index, field, value) => {
        const newLines = [...lines];
        newLines[index][field] = value;
        setLines(newLines);
        setData('lines', newLines);
    };

    const totalDebit = lines.reduce((sum, line) => sum + parseFloat(line.debit || 0), 0);
    const totalCredit = lines.reduce((sum, line) => sum + parseFloat(line.credit || 0), 0);
    const difference = totalDebit - totalCredit;

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('accounting.entries.update', entry.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Journal Entry #{entry.id}
                </h2>
            }
        >
            <Head title={`Edit Entry #${entry.id}`} />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <form onSubmit={handleSubmit}>
                            {/* Header Info */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Journal *</label>
                                    <select
                                        value={data.journal_id}
                                        onChange={(e) => setData('journal_id', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        required
                                    >
                                        {journals.map(journal => (
                                            <option key={journal.id} value={journal.id}>{journal.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Reference</label>
                                    <input
                                        type="text"
                                        value={data.reference}
                                        onChange={(e) => setData('reference', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                                    <input
                                        type="date"
                                        value={data.date}
                                        onChange={(e) => setData('date', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Lines */}
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-semibold text-gray-900">Journal Entry Lines</h3>
                                    <button
                                        type="button"
                                        onClick={addLine}
                                        className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm flex items-center gap-1"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add Line
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full border">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Account</th>
                                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Description</th>
                                                <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Debit</th>
                                                <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Credit</th>
                                                <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {lines.map((line, index) => (
                                                <tr key={index} className="border-t">
                                                    <td className="px-4 py-2">
                                                        <select
                                                            value={line.account_id}
                                                            onChange={(e) => updateLine(index, 'account_id', e.target.value)}
                                                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                                            required
                                                        >
                                                            <option value="">Select Account</option>
                                                            {accounts.map(account => (
                                                                <option key={account.id} value={account.id}>
                                                                    {account.code} - {account.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <input
                                                            type="text"
                                                            value={line.description}
                                                            onChange={(e) => updateLine(index, 'description', e.target.value)}
                                                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                                            required
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <input
                                                            type="number"
                                                            step="0.01"
                                                            value={line.debit}
                                                            onChange={(e) => updateLine(index, 'debit', e.target.value)}
                                                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm text-right"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <input
                                                            type="number"
                                                            step="0.01"
                                                            value={line.credit}
                                                            onChange={(e) => updateLine(index, 'credit', e.target.value)}
                                                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm text-right"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 text-center">
                                                        {lines.length > 2 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => removeLine(index)}
                                                                className="text-red-600 hover:text-red-800"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr className="border-t-2 bg-gray-50 font-semibold">
                                                <td colSpan="2" className="px-4 py-2 text-right">Totals:</td>
                                                <td className="px-4 py-2 text-right">${totalDebit.toFixed(2)}</td>
                                                <td className="px-4 py-2 text-right">${totalCredit.toFixed(2)}</td>
                                                <td className="px-4 py-2"></td>
                                            </tr>
                                            <tr className={`border-t ${Math.abs(difference) > 0.01 ? 'bg-red-50' : 'bg-green-50'}`}>
                                                <td colSpan="2" className="px-4 py-2 text-right font-semibold">Difference:</td>
                                                <td colSpan="2" className={`px-4 py-2 text-right font-semibold ${Math.abs(difference) > 0.01 ? 'text-red-700' : 'text-green-700'}`}>
                                                    ${Math.abs(difference).toFixed(2)} {Math.abs(difference) > 0.01 && '(Unbalanced!)'}
                                                </td>
                                                <td className="px-4 py-2"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                                <textarea
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    rows="3"
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    disabled={processing || Math.abs(difference) > 0.01}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300"
                                >
                                    Update Entry
                                </button>
                                <a
                                    href={route('accounting.entries.show', entry.id)}
                                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                                >
                                    Cancel
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
