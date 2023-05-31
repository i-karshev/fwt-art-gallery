import { createSlice } from '@reduxjs/toolkit';

import { authApi } from '@/api/features/authApi';
import { authLocalStorage } from '@/utils/auth/authLocalStorage';

interface AuthSliceState {
  isAuth: boolean;
}

const initialState: AuthSliceState = {
  isAuth: !!localStorage.getItem('jwt-access'),
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuth = false;
      authLocalStorage.remove();
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.isAuth = true;
      authLocalStorage.set(payload);
    });
    builder.addMatcher(authApi.endpoints.register.matchFulfilled, (state, { payload }) => {
      state.isAuth = true;
      authLocalStorage.set(payload);
    });
    builder.addMatcher(authApi.endpoints.refresh.matchFulfilled, (state, { payload }) => {
      authLocalStorage.set(payload);
    });
  },
});

export const { reducer: authReducer, actions: authActions } = AuthSlice;
