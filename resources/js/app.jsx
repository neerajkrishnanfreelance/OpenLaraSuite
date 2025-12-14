import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';

if ('serviceWorker' in navigator) {
    registerSW({ immediate: true });
}

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <AppWrapper App={App} props={props} />
        );
    },
    progress: false, // Usage of custom loader
});

import { router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import ShipLoader from './Components/ShipLoader';

function AppWrapper({ App, props }) {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const start = () => setIsLoading(true);
        const finish = () => setIsLoading(false);

        router.on('start', start);
        router.on('finish', finish);

        return () => {
            // Cleanup listeners if necessary (though app usually persists)
        };
    }, []);

    return (
        <>
            {isLoading && <ShipLoader />}
            <App {...props} />
        </>
    );
}
