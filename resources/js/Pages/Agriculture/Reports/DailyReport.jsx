import { Head } from '@inertiajs/react';
import { useRef } from 'react';

export default function DailyReport({ start_date, end_date, logs }) {

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="bg-white min-h-screen font-sans text-gray-900">
            <Head title={`Report - ${start_date} to ${end_date}`} />

            {/* Print Controls - Hidden when printing */}
            <div className="print:hidden bg-gray-100 p-4 border-b flex justify-between items-center sticky top-0">
                <a href={route('agriculture.reports.index')} className="text-indigo-600 hover:text-indigo-800 font-medium">← Back to Reports</a>
                <button
                    onClick={handlePrint}
                    className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700"
                >
                    Print / Save as PDF
                </button>
            </div>

            <div className="max-w-4xl mx-auto p-8" id="printable-area">
                {/* Header */}
                <div className="border-b-2 border-gray-800 pb-4 mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold uppercase tracking-wide">Agriculture Report</h1>
                        <p className="text-gray-500 mt-1">OpenLaraSuite Agriculture Module</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-500 uppercase">Period</p>
                        <p className="text-xl font-bold">
                            {new Date(start_date).toLocaleDateString()} - {new Date(end_date).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                {/* Content */}
                {logs.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 border border-gray-200 rounded">
                        <p className="text-gray-500 italic">No activity logs recorded for this date.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {logs.map((log) => (
                            <div key={log.id} className="border border-gray-200 rounded-lg p-4 break-inside-avoid">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className={`px-2 py-1 text-xs font-bold uppercase rounded ${log.log_type === 'nutrition' ? 'bg-purple-100 text-purple-800' :
                                            log.log_type === 'pesticide' ? 'bg-red-100 text-red-800' :
                                                log.log_type === 'water' ? 'bg-blue-100 text-blue-800' :
                                                    log.log_type === 'harvest' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-gray-100 text-gray-800'
                                            }`}>
                                            {log.log_type}
                                        </span>
                                        <h3 className="text-lg font-bold">{log.crop?.name}</h3>
                                        <span className="text-sm text-gray-500">({log.crop?.variety})</span>
                                    </div>
                                    <div className="text-right text-sm text-gray-500">
                                        {log.duration_minutes && <span className="block font-bold">{log.duration_minutes} mins</span>}
                                        {log.stage && <span className="block">Stage: {log.stage}</span>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Observation / Notes */}
                                    <div className="col-span-2">
                                        {log.notes ? (
                                            <p className="text-gray-800 whitespace-pre-line">{log.notes}</p>
                                        ) : (
                                            <p className="text-gray-400 italic">No notes.</p>
                                        )}

                                        {/* Activity Details */}
                                        {['nutrition', 'pesticide'].includes(log.log_type) && log.input_name && (
                                            <div className={`mt-2 text-sm p-2 rounded border inline-block ${log.log_type === 'nutrition' ? 'bg-purple-50 border-purple-100 font-bold text-purple-800' : 'bg-red-50 border-red-100 font-bold text-red-800'}`}>
                                                <span className="font-bold">Input Applied:</span> {log.input_name}
                                                {log.input_quantity && ` - ${log.input_quantity} ${log.input_unit}`}
                                            </div>
                                        )}
                                    </div>

                                    {/* Metrics & Image */}
                                    <div className="border-l pl-4 md:text-right">
                                        {(log.temperature || log.humidity) && (
                                            <div className="text-sm text-gray-600 mb-2">
                                                {log.temperature && <div>Tmp: {log.temperature}°C</div>}
                                                {log.humidity && <div>Hum: {log.humidity}%</div>}
                                            </div>
                                        )}
                                        {log.image_path && (
                                            <div className="mt-2">
                                                <img
                                                    src={`/storage/${log.image_path}`}
                                                    className="w-24 h-24 object-cover rounded border border-gray-300 ml-auto"
                                                    alt="Evidence"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Footer */}
                <div className="mt-12 pt-4 border-t border-gray-200 text-center text-xs text-gray-400">
                    Generated by OpenLaraSuite Agriculture Module • {new Date().toLocaleString()}
                </div>
            </div>

            <style>{`
                @media print {
                    @page { margin: 2cm; }
                    body { -webkit-print-color-adjust: exact; }
                }
            `}</style>
        </div>
    );
}
