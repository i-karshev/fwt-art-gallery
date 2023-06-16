import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { setupStore } from '@/store/store';
import { ThemeProvider } from '@/context/ThemeProvider';
import { FilterProvider } from '@/context/FilterProvider';
import { App } from '@/components/App';

import '@/assets/scss/main.scss';

const rootElement = document.getElementById('root') as HTMLDivElement;
const root = createRoot(rootElement);
export const store = setupStore();

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <BrowserRouter>
          <FilterProvider>
            <App />
          </FilterProvider>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
