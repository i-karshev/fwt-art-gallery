import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/App';

import './assets/scss/main.scss';
import { ThemeProvider } from './context/ThemeProvider';

const rootElement = document.getElementById('root');

if (rootElement === null) {
  throw new Error('Root element is not found!');
}

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
