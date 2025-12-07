import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';

export default function ExcelActions() {
    const [importing, setImporting] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        file: null,
    });

    const handleExport = () => {
        window.location.href = route('tasks.export');
    };

    const handleImport = (e) => {
        e.preventDefault();
        post(route('tasks.import'), {
            onSuccess: () => {
                setImporting(false);
                reset();
                // Optionally refresh or show toast
            },
        });
    };

    return (
        <div className="flex space-x-2">
            <SecondaryButton onClick={handleExport}>
                Export to Excel
            </SecondaryButton>

            {!importing ? (
                <PrimaryButton onClick={() => setImporting(true)}>
                    Import from Excel
                </PrimaryButton>
            ) : (
                <form onSubmit={handleImport} className="flex items-center space-x-2">
                    <input
                        type="file"
                        onChange={e => setData('file', e.target.files[0])}
                        className="text-sm"
                        accept=".xlsx,.xls,.csv"
                        required
                    />
                    <PrimaryButton disabled={processing}>Upload</PrimaryButton>
                    <button type="button" onClick={() => setImporting(false)} className="text-gray-500 hover:text-gray-700 text-sm">Cancel</button>
                </form>
            )}
        </div>
    );
}
