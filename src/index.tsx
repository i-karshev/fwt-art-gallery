import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { setupStore } from '@/store/store';
import { ThemeProvider } from '@/context/ThemeProvider';
import { App } from '@/components/App';

import '@/assets/scss/main.scss';
import { AuthProvider } from '@/context/AuthProvider';

const rootElement = document.getElementById('root') as HTMLDivElement;
const root = createRoot(rootElement);
export const store = setupStore();

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
