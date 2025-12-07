import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-50 pt-6 sm:justify-center sm:pt-0">
            <div className="w-full overflow-hidden bg-white shadow-xl sm:max-w-md sm:rounded-lg">
                <div className="bg-purple-900 py-8 text-center">
                    <div className="flex justify-center mb-4">
                        <Link href="/">
                            <ApplicationLogo className="h-12 w-12 fill-current text-yellow-400" />
                        </Link>
                    </div>
                    <h2 className="text-2xl font-bold text-white">TaskFlow Pro</h2>
                    <p className="text-purple-200 text-sm mt-1">Access your projects and calendar.</p>
                </div>

                <div className="px-6 py-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
