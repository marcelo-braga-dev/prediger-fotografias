import './bootstrap';
import '../css/app.css';
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/style.css';
import '../css/theme.css';
import '../css/lightbox.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import ThemeCustomization from '@/themes/index';

import {createRoot} from 'react-dom/client';
import {createInertiaApp} from '@inertiajs/react';
import {resolvePageComponent} from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({el, App, props}) {
        const root = createRoot(el);

        root.render(<ThemeCustomization><App {...props} /></ThemeCustomization>);
    },
    progress: {
        color: '#4B5563',
    },
});
