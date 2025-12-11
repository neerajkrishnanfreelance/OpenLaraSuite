import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function BudgetLayout({ children, header }) {
    return (
        <AuthenticatedLayout
            header={header}
        >
            <Head title="Budget" />

            {/* 
               We don't need to pass customNav anymore as AuthenticatedLayout 
               handles it based on the URL prefix (/budget) 
            */}

            {children}
        </AuthenticatedLayout>
    );
}
