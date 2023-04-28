import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { artistReducer } from './reducers/ArtistSlice';
<<<<<<<<< Temporary merge branch 1
import { apiService } from '../api';

const rootReducer = combineReducers({
  artistReducer,
  [apiService.reducerPath]: apiService.reducer,
=========

const rootReducer = combineReducers({
  artistReducer,
>>>>>>>>> Temporary merge branch 2
});

const rootStore = configureStore({
  reducer: rootReducer,
<<<<<<<<< Temporary merge branch 1
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiService.middleware),
=========
>>>>>>>>> Temporary merge branch 2
});

export const setupStore = () => rootStore;

setupListeners(rootStore.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
