import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery, instance } from '@/api/axiosBaseQuery';
import { store } from '@/index';
import { authApi } from '@/api/authApi';

instance.interceptors.request.use(
  (config) => {
    const { accessToken } = store.getState().authReducer;
    if (accessToken) {
      config.headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return config;
  },

  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,

  (error) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
    const originalRequest = error.config;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (error.response && error.response.status === 401) {
      const { refreshToken } = store.getState().authReducer;
      authApi.endpoints.refresh.initiate({ refreshToken, fingerprint: 'fingerprint' });

      const { accessToken } = store.getState().authReducer;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      originalRequest.config?.headers.set('Authorization', `Bearer ${accessToken}`);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return instance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export const apiService = createApi({
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
});
