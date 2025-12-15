import { Head, Link } from '@inertiajs/react';
import { QRCodeSVG } from 'qrcode.react';
import { ArrowLeft, Wifi, Globe, ToggleLeft, ToggleRight } from 'lucide-react';
import { useState } from 'react';

export default function QrCodeIndex({ localIp, appPort, ngrokUrl }) {
    const [mode, setMode] = useState(ngrokUrl ? 'ngrok' : 'local');

    // Determine the URL to show based on mode
    const mobileUrl = mode === 'ngrok' && ngrokUrl
        ? ngrokUrl
        : `http://${localIp}:${appPort}`;

    const isNgrokActive = !!ngrokUrl;

    return (
        <>
            <Head title="Mobile Access" />
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 text-indigo-600 hover:text-indigo-500 mb-6 font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Welcome
                    </Link>

                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Scan to Open
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Access the application on your mobile device
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">

                        {/* Source Toggle */}
                        {isNgrokActive && (
                            <div className="flex justify-center mb-6">
                                <div className="bg-gray-100 p-1 rounded-lg flex items-center">
                                    <button
                                        onClick={() => setMode('local')}
                                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${mode === 'local' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        Local Network
                                    </button>
                                    <button
                                        onClick={() => setMode('ngrok')}
                                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${mode === 'ngrok' ? 'bg-white shadow text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        Global (Ngrok)
                                    </button>
                                </div>
                            </div>
                        )}

                        {mode === 'ngrok' ? (
                            <div className="bg-green-50 p-4 rounded-lg inline-block mb-6">
                                <Globe className="w-8 h-8 text-green-600 mx-auto mb-2" />
                                <p className="text-xs text-green-800 font-medium">
                                    Global Access via Ngrok
                                </p>
                            </div>
                        ) : (
                            <div className="bg-indigo-50 p-4 rounded-lg inline-block mb-6">
                                <Wifi className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                                <p className="text-xs text-indigo-800 font-medium">
                                    Connect phone to same Wi-Fi
                                </p>
                            </div>
                        )}

                        <div className="flex justify-center mb-6">
                            <div className={`p-4 border-2 border-dashed rounded-xl ${mode === 'ngrok' ? 'border-green-200' : 'border-gray-200'}`}>
                                <QRCodeSVG value={mobileUrl} size={200} />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                    {mode === 'ngrok' ? 'Public URL' : 'Local Network URL'}
                                </label>
                                <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                                    <code className="text-sm text-gray-800 font-mono break-allSelect">
                                        {mobileUrl}
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
