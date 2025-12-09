import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function TodoCategories({ auth, categories }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Todo Categories
                </h2>
            }
        >
            <Head title="Todo Categories" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-gray-600">
                            Categories management - Coming soon
                        </p>
                        <Link href="/todos" className="text-indigo-600 hover:text-indigo-800 mt-4 inline-block">
                            ← Back to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
