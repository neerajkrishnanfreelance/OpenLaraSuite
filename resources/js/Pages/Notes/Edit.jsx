import React, { useRef, useState, useEffect, useCallback } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import FabricCanvas from '@/Components/FabricCanvas';
import SpreadsheetEditor from '@/Components/SpreadsheetEditor';
import DocumentEditor from '@/Components/DocumentEditor';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import axios from 'axios'; // For file uploads
import {
    Save,
    Eraser,
    Download,
    Plus,
    ArrowLeft,
    ArrowRight,
    Square,
    Circle,
    Triangle,
    Type,
    PenTool,
    Trash,
    Minus,
    Expand,
    Minimize,
    Mic,
    StopCircle,
    Play,
    Paperclip,
    Youtube,
    Link as LinkIcon,
    FileText,
    Table as TableIcon
} from 'lucide-react';
import { format } from 'date-fns';

export default function Edit({ auth, note, projects = [], preselected_project_id = null }) {
    const canvasRef = useRef(null);
    const [pages, setPages] = useState([]);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);

    // Canvas sizing
    const containerRef = useRef(null);
    const [canvasDimensions, setCanvasDimensions] = useState({ width: 800, height: 600 });

    const [activeTool, setActiveTool] = useState('pencil');
    const [brushColor, setBrushColor] = useState('#000000');
    const [brushWidth, setBrushWidth] = useState(2);
    const [isFullScreen, setIsFullScreen] = useState(false);
    // const [saveStatus, setSaveStatus] = useState('saved'); // Auto-save removed
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recordingDuration, setRecordingDuration] = useState(0);
    const [recordings, setRecordings] = useState(note ? note.recordings || [] : []);
    const timerRef = useRef(null);

    // Relations
    const [availableTasks, setAvailableTasks] = useState([]);

    const [viewMode, setViewMode] = useState('canvas'); // 'canvas' | 'spreadsheet' | 'document'
    const spreadsheetRef = useRef(null);
    const documentRef = useRef(null);

    const { data, setData, post, put, processing, errors } = useForm({
        title: note ? note.title : '',
        content: note ? note.content : '',
        drawing_data: note ? note.drawing_data : '',
        spreadsheet_data: note ? note.spreadsheet_data : '',
        document_data: note ? note.document_data : '',
        project_id: note ? note.project_id : (preselected_project_id || ''),
        task_id: note ? note.task_id : '',
    });

    // Update available tasks when project changes
    useEffect(() => {
        if (data.project_id) {
            const project = projects.find(p => p.id == data.project_id);
            setAvailableTasks(project ? project.tasks : []);
        } else {
            setAvailableTasks([]);
        }
    }, [data.project_id, projects]);

    // Load initial data
    useEffect(() => {
        if (note && note.drawing_data) {
            try {
                // Try parsing V2 JSON format
                const parsed = JSON.parse(note.drawing_data);
                if (parsed.version === 2 && Array.isArray(parsed.pages)) {
                    setPages(parsed.pages);
                    setCurrentPageIndex(0);
                } else {
                    // Fallback for V1 (legacy image data URL or flat JSON) or empty
                    setPages([{}]);
                }
            } catch (e) {
                // Not JSON, or empty
                setPages([{}]);
            }
        } else {
            setPages([{}]);
        }
    }, [note]);

    // Load page content when page index changes
    useEffect(() => {
        if (pages.length > 0 && canvasRef.current) {
            const pageData = pages[currentPageIndex];
            // We need to clear first then load
            canvasRef.current.clear();
            if (pageData && Object.keys(pageData).length > 0) {
                canvasRef.current.loadFromJSON(pageData);
            }

            // Re-apply tool settings
            handleToolChange(activeTool);
            canvasRef.current.setBrushColor(brushColor);
            canvasRef.current.setBrushWidth(brushWidth);
        }
    }, [currentPageIndex, pages.length]);

    // Handle Responsive Resize
    useEffect(() => {
        const updateDimensions = () => {
            if (isFullScreen) {
                setCanvasDimensions({ width: window.innerWidth, height: window.innerHeight });
            } else if (containerRef.current) {
                const width = containerRef.current.clientWidth;
                // Height can be fixed or ratio based. Let's keep it fixed for now but fitting width.
                // 5:4 ratio or min 600
                setCanvasDimensions({ width: width, height: 600 });
            }
        };

        window.addEventListener('resize', updateDimensions);
        updateDimensions(); // Initial call

        // Slight delay to ensure layout is computed
        setTimeout(updateDimensions, 100);

        return () => window.removeEventListener('resize', updateDimensions);
    }, [isFullScreen]);


    const saveCurrentPage = () => {
        if (canvasRef.current) {
            const json = canvasRef.current.toJSON();
            const newPages = [...pages];
            newPages[currentPageIndex] = json;
            setPages(newPages);
            return newPages;
        }
        return pages;
    };

    const handleAddPage = () => {
        const currentPages = saveCurrentPage();
        setPages([...currentPages, {}]);
        setCurrentPageIndex(currentPages.length); // Move to new page
    };

    const handlePrevPage = () => {
        if (currentPageIndex > 0) {
            saveCurrentPage();
            setCurrentPageIndex(currentPageIndex - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPageIndex < pages.length - 1) {
            saveCurrentPage();
            setCurrentPageIndex(currentPageIndex + 1);
        }
    };

    const handleDeletePage = () => {
        if (pages.length <= 1) {
            alert("Cannot delete the last page.");
            return;
        }
        if (confirm("Delete this slide?")) {
            const newPages = pages.filter((_, index) => index !== currentPageIndex);
            setPages(newPages);
            // Adjust index if needed
            if (currentPageIndex >= newPages.length) {
                setCurrentPageIndex(newPages.length - 1);
            }
        }
    };

    // --- Attachments Logic ---
    const [attachments, setAttachments] = useState(note?.attachments || []);
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const handleFileUpload = async (e) => {
        if (!note || !note.id) {
            alert("Please save the note before adding attachments.");
            e.target.value = null;
            return;
        }

        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('type', 'file');
        formData.append('file', file);

        setIsUploading(true);
        try {
            const res = await axios.post(route('notes.attachments.store', note.id), formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setAttachments([...attachments, res.data]);
        } catch (error) {
            console.error("Upload failed", error);
            alert("Upload failed");
        }
        setIsUploading(false);
        e.target.value = null; // Reset input
    };

    const handleAddYoutube = async () => {
        if (!note || !note.id) {
            alert("Please save the note before adding attachments.");
            return;
        }

        if (!youtubeUrl) return;

        setIsUploading(true);
        try {
            const res = await axios.post(route('notes.attachments.store', note.id), {
                type: 'youtube',
                youtube_url: youtubeUrl
            });
            setAttachments([...attachments, res.data]);
            setYoutubeUrl('');
        } catch (error) {
            console.error("Add link failed", error);
            alert("Failed to add link");
        }
        setIsUploading(false);
    };

    const deleteAttachment = async (id) => {
        if (!confirm('Delete this attachment?')) return;
        try {
            await axios.delete(route('notes.attachments.destroy', id));
            setAttachments(attachments.filter(a => a.id !== id));
        } catch (error) {
            console.error("Delete failed", error);
        }
    };

    // Updated Tool Handler (existing)
    const handleToolChange = (tool) => {
        setActiveTool(tool);
        if (canvasRef.current) {
            if (tool === 'pencil') {
                canvasRef.current.setDrawingMode(true);
                canvasRef.current.setBrushColor(brushColor);
                canvasRef.current.setBrushWidth(brushWidth);
                canvasRef.current.setEraserMode(false);
            } else if (tool === 'eraser') {
                canvasRef.current.setDrawingMode(true);
                canvasRef.current.setEraserMode(true);
            } else {
                canvasRef.current.setDrawingMode(false);
                canvasRef.current.setEraserMode(false);
                if (tool !== 'select') {
                    canvasRef.current.addShape(tool, { stroke: brushColor, strokeWidth: parseInt(brushWidth) });
                    setActiveTool('select');
                }
            }
        }
    };

    const submit = (e) => {
        e.preventDefault();
        handleSubmit(e);
    };

    // Better submit handler
    const handleSubmit = (e) => {
        if (e) e.preventDefault();

        const finalPages = saveCurrentPage();

        let finalSpreadsheetData = data.spreadsheet_data;
        if (spreadsheetRef.current) {
            finalSpreadsheetData = spreadsheetRef.current.getData();
        }

        let finalDocumentData = data.document_data;
        if (documentRef.current) {
            finalDocumentData = documentRef.current.getContent();
        }

        const payload = {
            title: data.title,
            content: data.content,
            drawing_data: JSON.stringify({ version: 2, pages: finalPages }),
            spreadsheet_data: finalSpreadsheetData,
            document_data: finalDocumentData,
            project_id: data.project_id,
            task_id: data.task_id
        };

        const options = {
            onSuccess: () => { },
            preserveScroll: true,
            preserveState: true,
        };

        if (note) {
            router.put(route('notes.update', note.id), payload, options);
        } else {
            router.post(route('notes.store'), payload, options);
        }
    };

    const handleViewSwitch = (newMode) => {
        if (newMode === viewMode) return;

        // Save current view data before switching
        if (viewMode === 'spreadsheet' && spreadsheetRef.current) {
            setData('spreadsheet_data', spreadsheetRef.current.getData());
        } else if (viewMode === 'document' && documentRef.current) {
            setData('document_data', documentRef.current.getContent());
        }

        setViewMode(newMode);
    };

    // Auto-Save Logic Removed as per user request
    const handleCanvasChange = () => {
        // No-op or dirty state for generic warning on exit? (Not requested yet)
    };


    // Voice Recording Logic
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            const chunks = [];

            recorder.ondataavailable = (e) => chunks.push(e.data);
            recorder.onstop = async () => {
                const blob = new Blob(chunks, { type: 'audio/webm' });
                const file = new File([blob], "recording.webm", { type: 'audio/webm' });

                // Upload immediately
                const formData = new FormData();
                formData.append('audio', file);
                formData.append('duration', recordingDuration);

                try {
                    if (note && note.id) {
                        const res = await axios.post(route('notes.recordings.store', note.id), formData, {
                            headers: { 'Content-Type': 'multipart/form-data' }
                        });
                        setRecordings([...recordings, res.data]);
                    } else {
                        alert("Please save the note at least once before recording.");
                    }
                } catch (err) {
                    console.error("Upload failed", err);
                    alert("Failed to upload recording.");
                }

                // Cleanup
                stream.getTracks().forEach(track => track.stop());
                setRecordingDuration(0);
                clearInterval(timerRef.current);
            };

            recorder.start();
            setMediaRecorder(recorder);
            setIsRecording(true);

            // Timer
            timerRef.current = setInterval(() => {
                setRecordingDuration(prev => prev + 1);
            }, 1000);

        } catch (err) {
            console.error("Microphone access denied", err);
            alert("Could not access microphone.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
            setIsRecording(false);
        }
    };

    const deleteRecording = async (recordingId) => {
        if (confirm("Delete this recording?")) {
            try {
                await axios.delete(route('notes.recordings.destroy', recordingId));
                setRecordings(recordings.filter(r => r.id !== recordingId));
            } catch (err) {
                console.error("Delete failed", err);
            }
        }
    };

    const formatDuration = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const handleFullScreenToggle = () => {
        if (!document.fullscreenElement) {
            const containerId = viewMode === 'canvas' ? 'edit-canvas-container'
                : viewMode === 'spreadsheet' ? 'edit-spreadsheet-container'
                    : 'edit-document-container';
            const el = document.getElementById(containerId);
            if (el) {
                el.requestFullscreen().then(() => setIsFullScreen(true)).catch(err => console.log(err));
            }
        } else {
            document.exitFullscreen().then(() => setIsFullScreen(false));
        }
    };

    useEffect(() => {
        const handleFSChange = () => {
            setIsFullScreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFSChange);
        return () => document.removeEventListener('fullscreenchange', handleFSChange);
    }, []);


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">{note ? 'Edit Note (V2)' : 'Create Note (V2)'}</h2>
                    {note && (
                        <div className="text-sm font-medium flex items-center gap-2">
                            {/* Manual Save Only */}
                        </div>
                    )}
                </div>
            }
        >
            <Head title={note ? 'Edit Note' : 'Create Note'} />

            <div className="py-12">
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit} className="space-y-6">

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="md:col-span-2 space-y-6">
                                        <div>
                                            <InputLabel htmlFor="title" value="Title" />
                                            <TextInput
                                                id="title"
                                                className="mt-1 block w-full"
                                                value={data.title}
                                                onChange={(e) => setData('title', e.target.value)}
                                                placeholder="Note Title..."
                                            />
                                            <InputError className="mt-2" message={errors.title} />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="content" value="Notes" />
                                            <TextArea
                                                id="content"
                                                className="mt-1 block w-full h-32 font-mono text-sm"
                                                value={data.content}
                                                onChange={(e) => setData('content', e.target.value)}
                                                placeholder="Type your notes here..."
                                            />
                                            <InputError className="mt-2" message={errors.content} />
                                        </div>
                                    </div>

                                    {/* Sidebar: Relations Box Only (Tools moved to Canvas Overlay) */}
                                    <div className="md:col-span-1 space-y-6">
                                        {/* Relations Box */}
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h3 className="font-medium text-gray-700 mb-3 block border-b pb-2">Link To</h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <InputLabel htmlFor="project_id" value="Project" />
                                                    <select
                                                        id="project_id"
                                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-sm"
                                                        value={data.project_id}
                                                        onChange={(e) => setData('project_id', e.target.value)}
                                                    >
                                                        <option value="">Select Project...</option>
                                                        {projects.map(p => (
                                                            <option key={p.id} value={p.id}>{p.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <InputLabel htmlFor="task_id" value="Task" />
                                                    <select
                                                        id="task_id"
                                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-sm"
                                                        value={data.task_id}
                                                        onChange={(e) => setData('task_id', e.target.value)}
                                                        disabled={!data.project_id}
                                                    >
                                                        <option value="">Select Task...</option>
                                                        {availableTasks.map(t => (
                                                            <option key={t.id} value={t.id}>{t.title}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Voice Recorder Section - Polish */}
                                <div className="border-t border-gray-200 pt-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                                            <Mic className="w-5 h-5 text-indigo-600" />
                                            Voice Notes
                                        </h3>
                                        <div className="flex items-center gap-3">
                                            {isRecording ? (
                                                <div className="flex items-center gap-3 bg-red-50 text-red-600 px-4 py-2 rounded-full border border-red-100 animate-pulse">
                                                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                                                    <span className="font-mono font-bold">{formatDuration(recordingDuration)}</span>
                                                    <button type="button" onClick={stopRecording} className="ml-2 hover:bg-red-100 p-1 rounded-full">
                                                        <StopCircle className="w-6 h-6" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={startRecording}
                                                    disabled={!note}
                                                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow"
                                                >
                                                    <Mic className="w-4 h-4" />
                                                    <span>Record</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Recordings List - WhatsApp Style */}
                                    <div className="space-y-3">
                                        {recordings.length === 0 && (
                                            <p className="text-sm text-gray-500 italic">No voice notes attached.</p>
                                        )}
                                        {recordings.map(rec => (
                                            <div key={rec.id} className="flex items-start gap-3">
                                                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-3 rounded-tl-none max-w-sm flex-1">
                                                    <div className="flex items-center gap-3">
                                                        <div className="bg-indigo-100 p-2 rounded-full">
                                                            <Play className="w-4 h-4 text-indigo-600" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <audio src={`/storage/${rec.file_path}`} controls className="h-8 w-full max-w-[200px]" />
                                                            <div className="flex justify-between items-center mt-1">
                                                                <span className="text-xs text-gray-500">
                                                                    {rec.duration ? formatDuration(rec.duration) : 'Voice Note'} • {new Date(rec.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => deleteRecording(rec.id)}
                                                            className="text-gray-400 hover:text-red-500 p-1"
                                                            title="Delete Recording"
                                                        >
                                                            <Trash className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    <div className="mt-2 flex justify-end">
                                                        <a
                                                            href={`/storage/${rec.file_path}`}
                                                            download={`recording-${rec.id}.webm`}
                                                            className="text-xs flex items-center gap-1 text-indigo-600 hover:text-indigo-800"
                                                        >
                                                            <Download className="w-3 h-3" /> Download
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Attachments Section */}
                                <div className="mb-6 border-b border-gray-100 pb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                        <Paperclip className="w-5 h-5 mr-2" />
                                        Attachments
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* File Upload */}
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-700 mb-2">Files</h4>
                                            <div className="flex items-center gap-2 mb-3">
                                                <input
                                                    type="file"
                                                    onChange={handleFileUpload}
                                                    className="block w-full text-sm text-gray-500
                                                        file:mr-4 file:py-2 file:px-4
                                                        file:rounded-full file:border-0
                                                        file:text-sm file:font-semibold
                                                        file:bg-indigo-50 file:text-indigo-700
                                                        hover:file:bg-indigo-100"
                                                    disabled={isUploading}
                                                />
                                                {isUploading && <span className="text-xs text-gray-500">Uploading...</span>}
                                            </div>
                                            <div className="space-y-2">
                                                {attachments.filter(a => a.type === 'file').map(att => (
                                                    <div key={att.id} className="flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-200">
                                                        <div className="flex items-center gap-2 overflow-hidden">
                                                            <FileText className="w-4 h-4 text-gray-500 shrink-0" />
                                                            <span className="text-sm text-gray-700 truncate">{att.name}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <a
                                                                href={`/storage/${att.file_path}`}
                                                                download
                                                                className="text-gray-400 hover:text-indigo-600 p-1"
                                                                title="Download"
                                                            >
                                                                <Download className="w-4 h-4" />
                                                            </a>
                                                            <button onClick={() => deleteAttachment(att.id)} className="text-gray-400 hover:text-red-500 p-1" title="Delete">
                                                                <Trash className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                                {attachments.filter(a => a.type === 'file').length === 0 && (
                                                    <p className="text-xs text-gray-400 italic">No files attached.</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* YouTube Links */}
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-700 mb-2">YouTube Links</h4>
                                            <div className="flex items-center gap-2 mb-3">
                                                <input
                                                    type="text"
                                                    placeholder="Paste YouTube URL"
                                                    value={youtubeUrl}
                                                    onChange={(e) => setYoutubeUrl(e.target.value)}
                                                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleAddYoutube}
                                                    disabled={!youtubeUrl || isUploading}
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                                >
                                                    <Plus className="w-4 h-4" /> Add
                                                </button>
                                            </div>
                                            <div className="space-y-2">
                                                {attachments.filter(a => a.type === 'youtube').map(att => (
                                                    <div key={att.id} className="flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-200">
                                                        <div className="flex items-center gap-2 overflow-hidden">
                                                            <Youtube className="w-4 h-4 text-red-500 shrink-0" />
                                                            <span className="text-sm text-gray-700 truncate">{att.name}</span>
                                                        </div>
                                                        <button onClick={() => deleteAttachment(att.id)} className="text-gray-400 hover:text-red-500 p-1">
                                                            <Trash className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                                {attachments.filter(a => a.type === 'youtube').length === 0 && (
                                                    <p className="text-xs text-gray-400 italic">No videos linked.</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Canvas/Spreadsheet Area */}
                                <div ref={containerRef} className="w-full relative">
                                    <div className="flex items-center gap-2 mb-2">
                                        <button
                                            type="button"
                                            onClick={() => handleViewSwitch('canvas')}
                                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${viewMode === 'canvas' ? 'bg-indigo-100 text-indigo-700 ring-2 ring-indigo-500 ring-offset-2' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
                                        >
                                            <PenTool className="w-4 h-4" /> Drawing
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleViewSwitch('spreadsheet')}
                                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${viewMode === 'spreadsheet' ? 'bg-green-100 text-green-700 ring-2 ring-green-500 ring-offset-2' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
                                        >
                                            <TableIcon className="w-4 h-4" /> Spreadsheet
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleViewSwitch('document')}
                                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${viewMode === 'document' ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-500 ring-offset-2' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
                                        >
                                            <FileText className="w-4 h-4" /> Document
                                        </button>
                                    </div>

                                    <div id="edit-canvas-container" className={`${viewMode === 'canvas' ? 'flex' : 'hidden'} border-x border-b border-gray-300 bg-gray-50 shadow-inner overflow-hidden flex-col items-center justify-center relative ${isFullScreen ? 'h-screen w-screen fixed top-0 left-0 z-50' : 'h-[600px] min-h-[500px]'}`}>

                                        {/* Floating Toolbar - Responsive */}
                                        <div className={`absolute top-4 left-4 z-30 flex flex-col gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-gray-200 transition-opacity duration-300 max-h-[calc(100%-2rem)] overflow-y-auto ${isFullScreen ? 'opacity-100' : 'opacity-100'}`}>
                                            <div className="grid grid-cols-2 gap-1 w-20 sm:w-24">
                                                <ToolBtn icon={PenTool} active={activeTool === 'pencil'} onClick={() => handleToolChange('pencil')} title="Pencil" />
                                                <ToolBtn icon={Eraser} active={activeTool === 'eraser'} onClick={() => handleToolChange('eraser')} title="Eraser Brush" />
                                                <ToolBtn icon={Square} active={activeTool === 'rect'} onClick={() => handleToolChange('rect')} title="Rectangle" />
                                                <ToolBtn icon={Circle} active={activeTool === 'circle'} onClick={() => handleToolChange('circle')} title="Circle" />
                                                <ToolBtn icon={Triangle} active={activeTool === 'triangle'} onClick={() => handleToolChange('triangle')} title="Triangle" />
                                                <ToolBtn icon={Minus} active={activeTool === 'line'} onClick={() => handleToolChange('line')} title="Line" />
                                                <ToolBtn icon={Type} active={activeTool === 'text'} onClick={() => handleToolChange('text')} title="Text" />
                                                <ToolBtn icon={Trash} onClick={() => canvasRef.current?.deleteSelected()} title="Delete Selected" />
                                            </div>

                                            <div className="w-full h-px bg-gray-200 my-1"></div>

                                            {/* Color Picker */}
                                            <div className="flex flex-wrap gap-1 justify-center px-1">
                                                {['#000000', '#FF0000', '#0000FF', '#008000'].map(c => (
                                                    <button
                                                        key={c}
                                                        type="button"
                                                        className={`w-5 h-5 rounded-full border border-gray-300 ${brushColor === c ? 'ring-2 ring-offset-1 ring-gray-400' : ''}`}
                                                        style={{ backgroundColor: c }}
                                                        onClick={() => setBrushColor(c)}
                                                    />
                                                ))}
                                                <input
                                                    type="color"
                                                    value={brushColor}
                                                    onChange={(e) => setBrushColor(e.target.value)}
                                                    className="w-5 h-5 p-0 border-0 rounded overflow-hidden"
                                                    title="Custom Color"
                                                />
                                            </div>

                                            <div className="w-full h-px bg-gray-200 my-1"></div>

                                            {/* Size Slider */}
                                            <div className="px-2">
                                                <input
                                                    type="range"
                                                    min="1"
                                                    max="20"
                                                    value={brushWidth}
                                                    onChange={(e) => setBrushWidth(e.target.value)}
                                                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                    title={`Brush Size: ${brushWidth}px`}
                                                />
                                            </div>

                                            <div className="w-full h-px bg-gray-200 my-1"></div>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (confirm("Clear this entire slide?")) {
                                                        canvasRef.current?.clear();
                                                    }
                                                }}
                                                className="w-full flex items-center justify-center gap-2 p-2 text-xs text-red-600 hover:bg-red-50 rounded"
                                            >
                                                <Eraser className="w-3 h-3" /> Clear
                                            </button>
                                        </div>

                                        {/* Slide Controls - Floating Top Center */}
                                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md border border-gray-200 whitespace-nowrap">
                                            <button type="button" onClick={handlePrevPage} disabled={currentPageIndex === 0} className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-30">
                                                <ArrowLeft className="w-4 h-4 text-gray-600" />
                                            </button>
                                            <span className="text-xs font-bold text-gray-700 min-w-[40px] text-center">
                                                {currentPageIndex + 1} / {pages.length}
                                            </span>
                                            <button type="button" onClick={handleNextPage} disabled={currentPageIndex === pages.length - 1} className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-30">
                                                <ArrowRight className="w-4 h-4 text-gray-600" />
                                            </button>
                                            <div className="w-px h-4 bg-gray-300 mx-1"></div>
                                            <button type="button" onClick={handleAddPage} className="p-1 rounded-full hover:bg-green-50 text-green-600" title="Add Slide">
                                                <Plus className="w-4 h-4" />
                                            </button>
                                            <button type="button" onClick={handleDeletePage} className="p-1 rounded-full hover:bg-red-50 text-red-500" title="Delete Slide">
                                                <Trash className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {/* Fullscreen Toggle - Floating Top Right */}
                                        <div className="absolute top-4 right-4 z-20">
                                            <button
                                                type="button"
                                                onClick={handleFullScreenToggle}
                                                className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md border border-gray-200 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 transition-all"
                                                title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
                                            >
                                                {isFullScreen ? <Minimize className="w-5 h-5" /> : <Expand className="w-5 h-5" />}
                                            </button>
                                        </div>

                                        <FabricCanvas
                                            ref={canvasRef}
                                            width={canvasDimensions.width}
                                            height={canvasDimensions.height}
                                            className="bg-white shadow-lg"
                                            onChange={handleCanvasChange}
                                        />
                                    </div>
                                    {viewMode === 'spreadsheet' && (
                                        <div id="edit-spreadsheet-container" className={`relative border-x border-b border-gray-300 bg-white shadow-inner overflow-hidden ${isFullScreen ? 'h-screen w-screen fixed top-0 left-0 z-50' : 'h-[600px] min-h-[500px]'}`}>
                                            {/* Fullscreen Toggle - Floating Top Right */}
                                            <div className="absolute top-4 right-4 z-20">
                                                <button
                                                    type="button"
                                                    onClick={handleFullScreenToggle}
                                                    className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md border border-gray-200 text-gray-600 hover:text-green-600 hover:bg-gray-50 transition-all"
                                                    title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
                                                >
                                                    {isFullScreen ? <Minimize className="w-5 h-5" /> : <Expand className="w-5 h-5" />}
                                                </button>
                                            </div>

                                            <SpreadsheetEditor
                                                ref={spreadsheetRef}
                                                initialData={data.spreadsheet_data}
                                                height={isFullScreen ? "100vh" : "600px"}
                                            />
                                        </div>
                                    )}

                                    {viewMode === 'document' && (
                                        <div id="edit-document-container" className={`relative border-x border-b border-gray-300 bg-white shadow-inner overflow-hidden ${isFullScreen ? 'h-screen w-screen fixed top-0 left-0 z-50' : 'h-[642px]'}`}>
                                            {/* Fullscreen & Download Tools - Floating Top Right */}
                                            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => documentRef.current?.downloadText()}
                                                    className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md border border-gray-200 text-gray-600 hover:text-purple-600 hover:bg-gray-50 transition-all"
                                                    title="Download as Text"
                                                >
                                                    <Download className="w-5 h-5" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => documentRef.current?.downloadHTML()}
                                                    className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md border border-gray-200 text-gray-600 hover:text-purple-600 hover:bg-gray-50 transition-all"
                                                    title="Download as HTML"
                                                >
                                                    <FileText className="w-5 h-5" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={handleFullScreenToggle}
                                                    className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md border border-gray-200 text-gray-600 hover:text-purple-600 hover:bg-gray-50 transition-all"
                                                    title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
                                                >
                                                    {isFullScreen ? <Minimize className="w-5 h-5" /> : <Expand className="w-5 h-5" />}
                                                </button>
                                            </div>

                                            <DocumentEditor
                                                ref={documentRef}
                                                initialData={data.document_data}
                                                height={isFullScreen ? "100vh" : "600px"}
                                            />
                                        </div>
                                    )}

                                    {viewMode === 'canvas' && (
                                        <p className="text-xs text-gray-500 mt-2 text-center md:text-left">
                                            Use tools to draw. Tip: Double click text objects to edit.
                                        </p>
                                    )}
                                </div>

                                {/* Bottom Action Bar - Modern Android Style */}
                                <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-200 p-4 md:static md:bg-transparent md:border-t-0 md:p-0 z-50 flex items-center justify-between md:justify-end gap-4 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] md:shadow-none">
                                    <Link
                                        href={route('notes.index')}
                                        className="text-gray-500 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors md:text-gray-600 md:underline md:hover:bg-transparent md:hover:text-gray-900"
                                    >
                                        Cancel
                                    </Link>

                                    <PrimaryButton disabled={processing} className="flex-1 md:flex-none justify-center py-3 md:py-2 text-base rounded-xl shadow-lg shadow-indigo-500/30">
                                        <Save className="w-5 h-5 mr-2" />
                                        {note ? 'Save Changes' : 'Create Note'}
                                    </PrimaryButton>
                                </div>
                            </form>
                            {/* Spacer for mobile bottom bar */}
                            <div className="h-24 md:hidden"></div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

const ToolBtn = ({ icon: Icon, active, onClick, title }) => (
    <button
        type="button"
        onClick={onClick}
        title={title}
        className={`p-1.5 sm:p-2 rounded flex items-center justify-center transition-colors ${active ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
    >
        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
    </button>
);
