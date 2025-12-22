import React, { useState, useEffect, useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Download, ArrowLeft, Trash2, Calendar, ArrowRight, Expand, Minimize, Play, Paperclip, FileText, Youtube } from 'lucide-react';
import FabricCanvas from '@/Components/FabricCanvas';
// import { jsPDF } from 'jspdf'; // Removed

export default function Show({ auth, note }) {
    const canvasRef = useRef(null);
    const [pages, setPages] = useState([]);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
        if (note && note.drawing_data) {
            try {
                const parsed = JSON.parse(note.drawing_data);
                if (parsed.version === 2 && Array.isArray(parsed.pages)) {
                    setPages(parsed.pages);
                } else if (typeof note.drawing_data === 'string' && note.drawing_data.startsWith('data:')) {
                    // Legacy support: if it's an image, create a dummy page? 
                    // Actually Fabric can't load image dataurl as json.
                    // We would need to load it as background image.
                    // For V2 show, we might just not show legacy drawings or need complex handling.
                    // Let's assume V2 data for now or empty.
                    setPages([{}]);
                } else {
                    setPages([{}]);
                }
            } catch (e) {
                setPages([{}]);
            }
        }
    }, [note]);

    useEffect(() => {
        if (pages.length > 0 && canvasRef.current) {
            const pageData = pages[currentPageIndex];
            if (pageData) {
                canvasRef.current.clear();
                canvasRef.current.loadFromJSON(pageData);
            }
        }
    }, [currentPageIndex, pages.length]);

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this note?')) {
            router.delete(route('notes.destroy', note.id));
        }
    };

    const handleFullScreenToggle = () => {
        if (!document.fullscreenElement) {
            const el = document.getElementById('canvas-container');
            if (el) {
                el.requestFullscreen().then(() => setIsFullScreen(true)).catch(err => console.log(err));
            }
        } else {
            document.exitFullscreen().then(() => setIsFullScreen(false));
        }
    };

    // Listen for fullscreen change events (browsers vary)
    useEffect(() => {
        const handleFSChange = () => {
            setIsFullScreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFSChange);
        return () => document.removeEventListener('fullscreenchange', handleFSChange);
    }, []);

    const handleDownloadPDF = async () => {
        setIsFullScreen(false); // Ensure we are not in fullscreen to capture correctly? Actually hidden canvas size is fixed.
        // Wait for UI?

        const images = [];
        if (pages.length > 0 && canvasRef.current) {
            // Process each page
            for (let i = 0; i < pages.length; i++) {
                // Determine if page has content
                const pageData = pages[i];
                if (!pageData || Object.keys(pageData).length === 0) continue;

                await new Promise((resolve) => {
                    canvasRef.current.clear();
                    canvasRef.current.loadFromJSON(pageData, () => {
                        resolve();
                    });
                });

                // Check if empty? Fabric 'clear' leaves background.
                // We'll just assume if it has data we print it.
                // High quality export
                const imgData = canvasRef.current.toDataURL({ format: 'png', quality: 1, multiplier: 2 });
                images.push(imgData);
            }

            // Restore current page
            if (pages[currentPageIndex]) {
                canvasRef.current.clear();
                canvasRef.current.loadFromJSON(pages[currentPageIndex]);
            }
        }

        // Send to backend
        try {
            // Using axios to download blob
            const response = await axios.post(route('notes.pdf', note.id), {
                images: images
            }, {
                responseType: 'blob'
            });

            // Trigger download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `note-${note.id}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("PDF generation failed", error);
            alert("Failed to generate PDF");
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight flex items-center">
                        <Link href={route('notes.index')} className="mr-3 text-gray-500 hover:text-gray-700">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        View Note
                    </h2>
                    <div className="flex space-x-3">
                        <Link
                            href={route('notes.edit', note.id)}
                            className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300 disabled:opacity-25 transition ease-in-out duration-150"
                        >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-red-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                        </button>
                    </div>
                </div>
            }
        >
            <Head title={note.title || 'View Note'} />

            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            <div className="mb-6 pb-6 border-b border-gray-100 flex justify-between items-start">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{note.title || 'Untitled Note'}</h1>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        <span>Created {new Date(note.created_at).toLocaleDateString()} at {new Date(note.created_at).toLocaleTimeString()}</span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        {note.project && (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                Project: {note.project.name}
                                            </span>
                                        )}
                                        {note.task && (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Task: {note.task.title}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={handleDownloadPDF}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    <Download className="w-5 h-5" />
                                    Download PDF
                                </button>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Notes</h3>
                                    <div className="bg-gray-50 p-4 rounded-lg text-gray-800 whitespace-pre-wrap min-h-[5rem]">
                                        {note.content || <span className="text-gray-400 italic">No text content.</span>}
                                    </div>
                                </div>

                                {/* Voice Recordings */}
                                {note.recordings && note.recordings.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Voice Notes</h3>
                                        <div className="flex flex-wrap gap-4">
                                            {note.recordings.map(rec => (
                                                <div key={rec.id} className="flex flex-col gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                                                    <div className="flex items-center gap-2">
                                                        <Play className="w-4 h-4 text-gray-600" />
                                                        <div className="text-sm font-medium text-gray-700 mr-2">Recording {rec.id}</div>
                                                        <audio src={`/storage/${rec.file_path}`} controls className="h-8 w-48" />
                                                        <a
                                                            href={`/storage/${rec.file_path}`}
                                                            download={`recording-${rec.id}.webm`}
                                                            className="p-1 text-gray-500 hover:text-indigo-600 rounded bg-white border border-gray-200 shadow-sm"
                                                            title="Download Audio"
                                                        >
                                                            <Download className="w-4 h-4" />
                                                        </a>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Attachments Section */}
                                {note.attachments && note.attachments.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2 flex items-center">
                                            <Paperclip className="w-4 h-4 mr-1" /> Attachments
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Files */}
                                            {note.attachments.filter(a => a.type === 'file').length > 0 && (
                                                <div className="space-y-2">
                                                    {note.attachments.filter(a => a.type === 'file').map(att => (
                                                        <div key={att.id} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                                                            <div className="flex items-center gap-2 overflow-hidden">
                                                                <FileText className="w-4 h-4 text-gray-500 shrink-0" />
                                                                <span className="text-sm text-gray-700 truncate">{att.name}</span>
                                                            </div>
                                                            <a
                                                                href={`/storage/${att.file_path}`}
                                                                download
                                                                className="text-indigo-600 hover:text-indigo-800 p-1"
                                                            >
                                                                <Download className="w-4 h-4" />
                                                            </a>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Videos */}
                                            {note.attachments.filter(a => a.type === 'youtube').length > 0 && (
                                                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {note.attachments.filter(a => a.type === 'youtube').map(att => {
                                                        // Extract video ID (simple regex)
                                                        const videoId = att.url.split('v=')[1]?.split('&')[0] || att.url.split('/').pop();
                                                        return (
                                                            <div key={att.id} className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                                                                <div className="p-2 border-b border-gray-200 flex items-center gap-2">
                                                                    <Youtube className="w-4 h-4 text-red-500" />
                                                                    <span className="text-sm font-medium text-gray-700 truncate">{att.name}</span>
                                                                </div>
                                                                <div className="aspect-w-16 aspect-h-9">
                                                                    <iframe
                                                                        src={`https://www.youtube.com/embed/${videoId}`}
                                                                        frameBorder="0"
                                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                        allowFullScreen
                                                                        className="w-full h-64"
                                                                    ></iframe>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <div className="flex justify-between items-center mb-2 px-2">
                                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                                            Slide {currentPageIndex + 1} of {pages.length}
                                        </h3>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setCurrentPageIndex(Math.max(0, currentPageIndex - 1))}
                                                disabled={currentPageIndex === 0}
                                                className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
                                            >
                                                <ArrowLeft className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => setCurrentPageIndex(Math.min(pages.length - 1, currentPageIndex + 1))}
                                                disabled={currentPageIndex === pages.length - 1 || pages.length === 0}
                                                className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
                                            >
                                                <ArrowRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div id="canvas-container" className={`border border-gray-200 rounded-lg overflow-hidden bg-gray-50 flex flex-col items-center justify-center p-4 relative ${isFullScreen ? 'h-screen w-screen fixed top-0 left-0 z-50 p-0 bg-white' : ''}`}>
                                    {isFullScreen && (
                                        <div className="absolute top-4 right-4 z-50">
                                            <button onClick={handleFullScreenToggle} className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700">
                                                <Minimize className="w-5 h-5" />
                                            </button>
                                        </div>
                                    )}
                                    {!isFullScreen && (
                                        <div className="absolute top-2 right-2 z-10">
                                            <button onClick={handleFullScreenToggle} className="text-gray-500 hover:text-indigo-600 bg-white p-1 rounded shadow-sm border border-gray-200">
                                                <Expand className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                    <FabricCanvas
                                        ref={canvasRef}
                                        width={isFullScreen ? window.innerWidth : 800}
                                        height={isFullScreen ? window.innerHeight : 600}
                                        readOnly={true}
                                        className="bg-white shadow-lg pointer-events-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
