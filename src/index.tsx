import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { setupStore } from '@/store/store';
import { ThemeProvider } from '@/context/ThemeProvider';
import { App } from '@/components/App';

import '@/assets/scss/main.scss';

const rootElement = document.getElementById('root') as HTMLDivElement;
const root = createRoot(rootElement);
const store = setupStore();

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
