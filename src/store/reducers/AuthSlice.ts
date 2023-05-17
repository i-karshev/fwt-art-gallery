import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '@/api/authApi';

interface AuthSliceState {
  isLoggedIn: boolean;
  accessToken: string;
  refreshToken: string;
}

const initialState: AuthSliceState = {
  isLoggedIn: false,
  accessToken: '',
  refreshToken: '',
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.accessToken = '';
      state.refreshToken = '';
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.isLoggedIn = true;
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    });
    builder.addMatcher(authApi.endpoints.register.matchFulfilled, (state, { payload }) => {
      state.isLoggedIn = true;
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    });
    builder.addMatcher(authApi.endpoints.refresh.matchFulfilled, (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    });
  },
});

export const { reducer: authReducer, actions: authActions } = AuthSlice;
