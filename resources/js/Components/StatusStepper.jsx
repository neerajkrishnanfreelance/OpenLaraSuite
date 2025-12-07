import React from 'react';

export default function StatusStepper({ status, onChange, options = [] }) {
    // Standard status order maps to options if not provided
    const defaultOptions = [
        { value: 'todo', label: 'To Do' },
        { value: 'in_progress', label: 'In Progress' },
        { value: 'review', label: 'Review' },
        { value: 'done', label: 'Done' }
    ];

    const currentOptions = options.length > 0 ? options : defaultOptions;
    const currentIndex = currentOptions.findIndex(o => o.value === status);

    return (
        <div className="w-full">
            <div className="flex items-center justify-between w-full relative">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 transform -translate-y-1/2 rounded" />

                {/* Colored Line Progress */}
                <div
                    className="absolute top-1/2 left-0 h-1 bg-purple-600 -z-10 transform -translate-y-1/2 rounded transition-all duration-300"
                    style={{ width: `${(currentIndex / (currentOptions.length - 1)) * 100}%` }}
                />

                {currentOptions.map((option, index) => {
                    const isActive = index <= currentIndex;
                    const isCurrent = index === currentIndex;

                    return (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange(option.value)}
                            className="group flex flex-col items-center focus:outline-none"
                        >
                            <div
                                className={`
                                    w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-200
                                    ${isActive
                                        ? 'bg-purple-600 border-purple-600 text-white shadow-md'
                                        : 'bg-white border-gray-300 text-gray-400 group-hover:border-purple-400'}
                                    ${isCurrent ? 'ring-2 ring-purple-200 scale-110' : ''}
                                `}
                            >
                                {isActive ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                ) : (
                                    <span className="text-xs">{index + 1}</span>
                                )}
                            </div>
                            <span
                                className={`
                                    mt-2 text-xs font-medium transition-colors duration-200
                                    ${isCurrent ? 'text-purple-700 font-bold' : isActive ? 'text-purple-600' : 'text-gray-500 group-hover:text-gray-700'}
                                `}
                            >
                                {option.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
