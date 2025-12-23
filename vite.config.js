import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({

    server: {
        host: '0.0.0.0', // Explicitly bind to all interfaces
        port: 5173,
        strictPort: true,
        cors: true,
        hmr: {
            host: 'localhost', // Default to localhost, but client will try to derive it usually. 
            // For Ngrok/LAN, it's safer to rely on the client knowing where it connected.
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*',
        },
        allowedHosts: ['all'], // Allow any host for Ngrok
    },

    plugins: [

        laravel({
            input: 'resources/js/app.jsx',
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            outDir: 'public',
            scope: '/',
            base: '/',
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
            manifest: {
                name: 'OpenLaraSuite',
                short_name: 'OpenLara',
                description: 'OpenLaraSuite ERP Application',
                theme_color: '#ffffff',
                start_url: '/',
                scope: '/',
                icons: [
                    {
                        src: '/pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: '/pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            },
            workbox: {
                navigateFallback: null
            }
        }),
    ],
});
