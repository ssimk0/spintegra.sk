import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import {Integrations} from '@sentry/tracing';
import {AppProvider} from './context/app';
import PageService from './service/page';
import setupApi from './api';

import App from './App';
import 'tailwind.output.css';
import 'styles/main.css';


if (process.env === "production") {
    Sentry.init({
        dsn: "https://c3752759514d4b57b580d282b49fc338@o254716.ingest.sentry.io/5420367",
        integrations: [
            new Integrations.BrowserTracing(),
        ],
        tracesSampleRate: 1.0,
    });
}

setupApi()

ReactDOM.render(
    <AppProvider>
        <App pageService={PageService}/>
    </AppProvider>,
    document.getElementById('root')
);

