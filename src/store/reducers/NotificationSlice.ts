import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { artistApi } from '@/api/features/artistApi';
import { authApi } from '@/api/features/authApi';
import { genreApi } from '@/api/features/genreApi';
import { IErrorResponse } from '@/types/IError';
import { apiService } from '@/api';

interface INotificationSliceState {
  message: string | null;
}

const initialState: INotificationSliceState = {
  message: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    deleteNotification(store) {
      // eslint-disable-next-line no-param-reassign
      store.message = null;
    },
  },
  extraReducers: (builder) => {
    const endpoints = { ...artistApi.endpoints, ...genreApi.endpoints, ...authApi.endpoints };
    const matchRejectedEndpoints = Object.keys(apiService.endpoints).map(
      (key) => endpoints[key as keyof typeof endpoints].matchRejected
    );

    builder.addMatcher(isAnyOf(...matchRejectedEndpoints), (state, { payload }) => {
      state.message = (payload as IErrorResponse).message;
    });
  },
});

export const { reducer: notificationReducer, actions: notificationActions } = notificationSlice;
