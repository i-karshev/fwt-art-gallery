import axios, { AxiosError } from 'axios';
import type { AxiosRequestConfig } from 'axios';

import { API_BASE_URL } from '@/constans';
import { authLocalStorage, isExpiredToken, refreshTokenRequest } from '@/utils/auth';

export const instance = axios.create({
  baseURL: API_BASE_URL,
});

instance.interceptors.request.use(
  async (config) => {
    let { accessToken } = authLocalStorage.get();

    if (accessToken && !config.url?.includes('refresh')) {
      if (isExpiredToken(accessToken)) {
        await refreshTokenRequest();
        accessToken = authLocalStorage.get().accessToken;
      }

      if (accessToken) {
        config.headers.set('Authorization', `Bearer ${accessToken}`);
      }
    }

    return config;
  },

  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,

  async (error: AxiosError<unknown, AxiosRequestConfig>) => {
    if (error.response && error.response.status === 401) {
      const config = error.config as AxiosRequestConfig;
      const { refreshToken } = authLocalStorage.get();

      if (refreshToken && isExpiredToken(refreshToken) && !config.url?.includes('refresh')) {
        await refreshTokenRequest();
        const { accessToken } = authLocalStorage.get();

        if (accessToken) {
          config.headers = { ...config.headers, Authorization: `Bearer ${accessToken}` };
        }

        return instance(config);
      }
    }

    return Promise.reject(error);
  }
);
