import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
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
    Compass,
    Database,
    Sprout,
    Smartphone
} from 'lucide-react';


export default function Welcome({ auth }) {
    // ... existing suites data ...
    const suites = [
        {
            name: 'Business & CRM',
            description: 'Manage projects, tasks, and client relationships',
            tools: [
                {
                    title: 'Projects',
                    description: 'Track your progress',
                    icon: GraduationCap,
                    color: 'bg-blue-100 text-blue-600',
                    href: '/projects',
                },
                {
                    title: 'CRM',
                    description: 'Manage your contacts',
                    icon: Users,
                    color: 'bg-indigo-100 text-indigo-600',
                    href: '/contacts',
                },
                {
                    title: 'Calendar',
                    description: 'Schedule events',
                    icon: CalendarIcon,
                    color: 'bg-pink-100 text-pink-600',
                    href: '/calendar',
                },
                {
                    title: 'Tasks',
                    description: 'Daily checklists',
                    icon: CheckSquare,
                    color: 'bg-orange-100 text-orange-600',
                    href: '/todos',
                },
            ]
        },
        {
            name: 'Finance & Markets',
            description: 'Accounting, buckets, and investments',
            tools: [
                {
                    title: 'Accounting',
                    description: 'Financial overview',
                    icon: Calculator,
                    color: 'bg-green-100 text-green-600',
                    href: '/accounting',
                },
                {
                    title: 'Stock Market',
                    description: 'Track investments',
                    icon: Compass,
                    color: 'bg-purple-100 text-purple-600',
                    href: '/stocks',
                },
                {
                    title: 'Budget',
                    description: 'Plan your finances',
                    icon: PiggyBank,
                    color: 'bg-yellow-100 text-yellow-600',
                    href: '/budget',
                },
                {
                    title: 'Expense',
                    description: 'Log your spends',
                    icon: Receipt,
                    color: 'bg-teal-100 text-teal-600',
                    href: '/expenses',
                },
                {
                    title: 'Agriculture',
                    description: 'Monitor your crops',
                    icon: Sprout,
                    color: 'bg-lime-100 text-lime-600',
                    href: '/agriculture',
                },
            ]
        },
        {
            name: 'Personal & Growth',
            description: 'Health, learning, and reflection',
            tools: [
                {
                    title: 'Health',
                    description: 'Monitor wellness',
                    icon: Heart,
                    color: 'bg-red-100 text-red-600',
                    href: '/health',
                },
                {
                    title: 'Learning',
                    description: 'Advanced courses',
                    icon: BookOpen,
                    color: 'bg-cyan-100 text-cyan-600',
                    href: '/learning',
                },
                {
                    title: 'Journaling',
                    description: 'Reflect daily',
                    icon: PenTool,
                    color: 'bg-violet-100 text-violet-600',
                    href: '/journal',
                },
                {
                    title: 'Backups',
                    description: 'Data protection',
                    icon: Database,
                    color: 'bg-slate-100 text-slate-600',
                    href: '/settings/backups',
                },
            ]
        }
    ];

    const [uaeTime, setUaeTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setUaeTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <Head title="My Personal Hub" />
            <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
                {/* Header */}
                <header className="bg-white border-b border-gray-100 sticky top-0 z-10 transition-shadow hover:shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                                    OpenLaraSuite
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Link
                                    href={route('qrcode.index')}
                                    className="hidden sm:flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-indigo-600 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-full transition-colors"
                                >
                                    <Smartphone className="w-4 h-4" />
                                    Mobile Access
                                </Link>
                                <div className="text-sm text-gray-500 font-medium hidden sm:flex items-center gap-2">
                                    <span>UAE Time:</span>
                                    <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                                        {uaeTime.toLocaleTimeString('en-US', {
                                            timeZone: 'Asia/Dubai',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit',
                                            hour12: true
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto space-y-16">
                        {suites.map((suite, suiteIndex) => (
                            <div key={suiteIndex}>
                                <div className="mb-6 border-l-4 border-indigo-500 pl-4">
                                    <h2 className="text-2xl font-bold text-gray-900">{suite.name}</h2>
                                    <p className="text-gray-500">{suite.description}</p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {suite.tools.map((tool, index) => (
                                        <Link
                                            key={index}
                                            href={tool.href}
                                            className="group relative flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-indigo-50/50 hover:border-indigo-100 hover:-translate-y-1 transition-all duration-300 min-h-[200px]"
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
                                            <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-gray-100 group-hover:bg-indigo-400 transition-colors" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                {/* Footer */}
                <footer className="py-8 text-center text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} All rights reserved.
                </footer>
            </div>
        </>
    );
}
