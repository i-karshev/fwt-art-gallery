import React from 'react';
import { createRoot } from 'react-dom/client';
import {Provider} from "react-redux";

import {setupStore} from "./store/store";
import { ThemeProvider } from './context/ThemeProvider';
import { App } from './components/App';

import './assets/scss/main.scss';

const rootElement = document.getElementById('root');

if (rootElement === null) {
  throw new Error('Root element is not found!');
}

const root = createRoot(rootElement);
const store = setupStore();

root.render(
  <React.StrictMode>
    <ThemeProvider>
        <Provider store={store}>
          <App />
        </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
