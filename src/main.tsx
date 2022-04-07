import 'normalize.css';
import './themes';
import './scss/fonts.scss';
import './scss/utils.scss';

import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

const sentryDsn = import.meta.env.VITE_SENTRY_DSN;
if (sentryDsn && import.meta.env.PROD) {
  Sentry.init({
    dsn: `${sentryDsn}`,
    integrations: [new Integrations.BrowserTracing()],
    sampleRate: 1, // report all errors
    tracesSampleRate: 0.05, // report 5% of traces
  });
}

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { isCEFSharp } from 'ffxiv-overlay-api';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import DevPanel from './DevPanel';

let app = <App />;
// should be tree-shaked in production by vite
if (import.meta.env.DEV && !isCEFSharp()) {
  app = <DevPanel>{app}</DevPanel>;
}
// mount the app
const root = document.getElementById('root');
root &&
  createRoot(root).render(
    <StrictMode>
      <Provider store={store}>{app}</Provider>
    </StrictMode>
  );
