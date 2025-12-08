import React from 'react';

export default function StatCard({ title, subtitle, value, valueLabel, color = 'purple', href }) {

    // Color maps
    const colors = {
        purple: { bg: 'bg-purple-600', text: 'text-white', sub: 'text-purple-100' },
        blue: { bg: 'bg-blue-600', text: 'text-white', sub: 'text-blue-100' },
    };

    const theme = colors[color] || colors.purple;

    const Content = () => (
        <div className={`block ${theme.bg} p-6 rounded-2xl shadow-sm text-center h-full flex flex-col justify-center items-center hover:shadow-md transition duration-200`}>
            <div className={`text-4xl font-extrabold ${theme.text} mb-2`}>{value}</div>
            <div className={`text-sm font-medium ${theme.sub}`}>{valueLabel}</div>

            <div className={`text-xs ${theme.sub} mt-4 pt-4 border-t border-white/20 w-full`}>
                {subtitle}
            </div>
        </div>
    );

    if (href) {
        return (
            <Link href={href} className="block h-full">
                <Content />
            </Link>
        );
    }
    return <Content />;
}
