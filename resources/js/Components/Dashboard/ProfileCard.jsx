import React from 'react';
import { Link } from '@inertiajs/react';

export default function ProfileCard({ user, stats }) {
    const { daily_progress } = stats;

    // Calculate circumference for circle (r=36, c=2*pi*r approx 226)
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (daily_progress / 100) * circumference;

    return (
        <Link href={route('profile.edit')} className="block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition duration-200">
            {/* Header */}
            <div className="bg-blue-600 p-6 flex items-center">
                <div className="h-12 w-12 rounded-full border-2 border-white overflow-hidden bg-gray-200 flex-shrink-0">
                    <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff`}
                        alt={user.name}
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="ml-4 text-white">
                    <h3 className="text-lg font-bold leading-tight">{user.name}</h3>
                    <p className="text-blue-100 text-xs">{user.email}</p>
                    <p className="text-blue-200 text-[10px] mt-1 uppercase tracking-wider">{user.roles?.[0]?.name || 'Employee'}</p>
                </div>
            </div>

            {/* Stats Body */}
            <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-gray-700">Today's Tasks</span>
                    <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">{stats.todays_completed} / {stats.todays_total}</span>
                </div>

                {/* Mock Pending Items */}
                <div className="space-y-2 mt-4 mb-6">
                    <div className="flex items-center text-xs text-gray-600">
                        <span className="text-green-500 mr-2 font-bold">Check</span> Client Call (2:00 PM)
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                        <span className="text-green-500 mr-2 font-bold">Check</span> Send Proposal
                    </div>
                </div>


                <div className="flex justify-between items-center mb-4 pt-4 border-t border-gray-100">
                    <span className="text-sm font-bold text-gray-700">Pending Overall</span>
                    <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">{stats.pending_overall}</span>
                </div>

                <div className="space-y-2 mb-6">
                    <div className="bg-red-50 text-red-700 text-xs px-2 py-1 rounded border border-red-100">
                        Q4 Report - Overdue
                    </div>
                    <div className="bg-orange-50 text-orange-700 text-xs px-2 py-1 rounded border border-orange-100">
                        Follow-up Al Jazira - Due Tomorrow
                    </div>
                </div>

                {/* Circular Progress */}
                <div className="flex justify-center mt-4">
                    <div className="relative h-24 w-24">
                        <svg className="h-full w-full transform -rotate-90">
                            {/* Running Background Circle */}
                            <circle
                                cx="50%"
                                cy="50%"
                                r={radius}
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                className="text-gray-100"
                            />
                            {/* Progress Circle */}
                            <circle
                                cx="50%"
                                cy="50%"
                                r={radius}
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                strokeDasharray={circumference}
                                strokeDashoffset={offset}
                                strokeLinecap="round"
                                className="text-blue-500 transition-all duration-1000 ease-out"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                            <span className="text-xl font-bold text-blue-600">{daily_progress}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
