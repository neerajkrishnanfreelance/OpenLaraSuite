import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    Calendar,
    FolderKanban,
    Tags,
    TrendingUp
} from 'lucide-react';

export default function BudgetLayout({ children, header }) {
    const { url } = usePage();

    const navigation = [
        {
            name: 'Dashboard',
            href: '/budget',
            icon: LayoutDashboard,
            current: url === '/budget' || url.startsWith('/budget/dashboard'),
        },
        {
            name: 'Budget Plans',
            href: '/budget/plans',
            icon: FolderKanban,
            current: url.startsWith('/budget/plans'),
        },
        {
            name: 'Daily Entries',
            href: '/budget/entries',
            icon: Calendar,
            current: url.startsWith('/budget/entries'),
        },
        {
            name: 'Categories',
            href: '/budget/categories',
            icon: Tags,
            current: url.startsWith('/budget/categories'),
        },
    ];

    return (
        <AuthenticatedLayout
            customNav={
                <div className="bg-white border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex space-x-8 overflow-x-auto">
                            {navigation.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`
                                            inline-flex items-center px-1 pt-4 pb-3 border-b-2 text-sm font-medium whitespace-nowrap
                                            ${item.current
                                                ? 'border-indigo-500 text-indigo-600'
                                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                            }
                                        `}
                                    >
                                        <Icon className="w-4 h-4 mr-2" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            }
        >
            <Head title="Budget" />

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {children}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
