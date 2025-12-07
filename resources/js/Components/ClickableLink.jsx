import { Link } from '@inertiajs/react';

export default function ClickableLink({ routeName, params, children, className = '' }) {
    const baseClasses = "text-indigo-600 hover:text-indigo-900 hover:underline transition-colors duration-150 cursor-pointer font-medium";

    return (
        <Link
            href={route(routeName, params)}
            className={`${baseClasses} ${className}`}
        >
            {children}
        </Link>
    );
}
