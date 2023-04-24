import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import { artistReducer } from "./reducers/ArtistSlice";

const rootReducer = combineReducers({
    artistReducer,
})

const rootStore = configureStore({
    reducer: rootReducer
})

export const setupStore = () => rootStore;

setupListeners(rootStore.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];