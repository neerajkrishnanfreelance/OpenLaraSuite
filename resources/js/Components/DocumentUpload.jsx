import { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function DocumentUpload({ onFilesChange, existingDocuments = [], onDelete, isCreate = false }) {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles([...selectedFiles, ...files]);
        if (onFilesChange) {
            onFilesChange([...selectedFiles, ...files]);
        }
    };

    const removeSelected = (index) => {
        const newFiles = selectedFiles.filter((_, i) => i !== index);
        setSelectedFiles(newFiles);
        if (onFilesChange) {
            onFilesChange(newFiles);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Attachments</h3>

            {/* Upload Area */}
            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-gray-300">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500">Maximum file size: 10MB</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" multiple onChange={handleFileChange} />
                </label>
            </div>

            {/* New Files List */}
            {selectedFiles.length > 0 && (
                <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Files</h4>
                    <ul className="space-y-2">
                        {selectedFiles.map((file, index) => (
                            <li key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <span className="text-sm truncate">{file.name}</span>
                                <button type="button" onClick={() => removeSelected(index)} className="text-red-500 hover:text-red-700 text-sm">Remove</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Existing Documents (Edit Mode) */}
            {!isCreate && existingDocuments.length > 0 && (
                <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Attached Documents</h4>
                    <ul className="space-y-2">
                        {existingDocuments.map((doc) => (
                            <li key={doc.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <a href={`/storage/${doc.path}`} target="_blank" className="text-sm text-blue-600 hover:underline truncate">{doc.name}</a>
                                <button type="button" onClick={() => onDelete(doc.id)} className="text-red-500 hover:text-red-700 text-sm">Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
