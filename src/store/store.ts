import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { artistReducer } from '@/store/reducers/ArtistSlice';
import { apiService } from '@/api';
import { notificationReducer } from '@/store/reducers/NotificationSlice';

const rootReducer = combineReducers({
  artistReducer,
  notificationReducer,
  [apiService.reducerPath]: apiService.reducer,
});

export const rootStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiService.middleware),
});

export const setupStore = () => rootStore;

setupListeners(rootStore.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
