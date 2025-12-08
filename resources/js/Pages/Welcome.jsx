import { Head, Link } from '@inertiajs/react';
import {
    Users,
    Calculator,
    GraduationCap,
    PiggyBank,
    Heart,
    Receipt,
    BookOpen,
    Calendar as CalendarIcon,
    CheckSquare,
    PenTool,
    Compass
} from 'lucide-react';

export default function Welcome({ auth }) {
    const tools = [
        {
            title: 'CRM',
            description: 'Manage your contacts',
            icon: Users,
            color: 'bg-indigo-100 text-indigo-600',
            href: route('projects.index'), // Linking to projects as CRM placeholder
        },
        {
            title: 'Accounting',
            description: 'Financial overview',
            icon: Calculator,
            color: 'bg-green-100 text-green-600',
            href: route('dashboard'), // Placeholder
        },
        {
            title: 'Projects',
            description: 'Track your progress',
            icon: GraduationCap,
            color: 'bg-blue-100 text-blue-600',
            href: route('dashboard'), // Placeholder
        },
        {
            title: 'Budget',
            description: 'Plan your finances',
            icon: PiggyBank,
            color: 'bg-yellow-100 text-yellow-600',
            href: route('dashboard'), // Placeholder
        },
        {
            title: 'Health',
            description: 'Monitor wellness',
            icon: Heart,
            color: 'bg-red-100 text-red-600',
            href: route('dashboard'), // Placeholder
        },
        {
            title: 'Expense',
            description: 'Log your spends',
            icon: Receipt,
            color: 'bg-teal-100 text-teal-600',
            href: route('timesheets.index'), // Using timesheets as expense placeholder
        },
        {
            title: 'Learning Projects',
            description: 'Advanced courses',
            icon: BookOpen,
            color: 'bg-cyan-100 text-cyan-600',
            href: route('learning.index'),
        },
        {
            title: 'Calendar',
            description: 'Schedule events',
            icon: CalendarIcon,
            color: 'bg-pink-100 text-pink-600',
            href: route('calendar.index'),
        },
        {
            title: 'Todo',
            description: 'Daily checklists',
            icon: CheckSquare,
            color: 'bg-orange-100 text-orange-600',
            href: route('tasks.index'),
        },
        {
            title: 'Journaling',
            description: 'Reflect daily',
            icon: PenTool,
            color: 'bg-violet-100 text-violet-600',
            href: route('journal.index'),
        },
    ];

    return (
        <>
            <Head title="My Personal Hub" />
            <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
                {/* Header */}
                <header className="bg-white border-b border-gray-100 sticky top-0 z-10 transition-shadow hover:shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-200">
                                    <Compass className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                                    My Personal Hub
                                </span>
                            </div>
                            <div className="text-sm text-gray-500 font-medium hidden sm:block">
                                All tools in one place
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-wrap justify-center gap-6">
                            {tools.map((tool, index) => (
                                <Link
                                    key={index}
                                    href={tool.href}
                                    className="group relative flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-indigo-50/50 hover:border-indigo-100 hover:-translate-y-1 transition-all duration-300 w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] xl:w-[calc(25%-1.5rem)] min-h-[200px]"
                                >
                                    <div className={`p-4 rounded-2xl mb-4 ${tool.color} bg-opacity-20 group-hover:scale-110 transition-transform duration-300 ring-4 ring-white`}>
                                        <tool.icon className="w-8 h-8" strokeWidth={2.5} />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
                                        {tool.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 text-center font-medium">
                                        {tool.description}
                                    </p>

                                    {/* Subtle decorative elements */}
                                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-gray-100 group-hover:bg-indigo-400 transition-colors" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="py-8 text-center text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} My Personal Hub. All rights reserved.
                </footer>
            </div>
        </>
    );
}
