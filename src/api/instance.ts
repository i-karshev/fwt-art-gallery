import axios, { AxiosError } from 'axios';
import type { AxiosRequestConfig } from 'axios';

import { API_BASE_URL } from '@/constans';
import { authLocalStorage } from '@/utils/auth/authLocalStorage';
import { isExpiredToken } from '@/utils/auth/isExpiredToken';
import { refreshTokenRequest } from '@/utils/auth/refreshTokenRequest';

const instance = axios.create({
  baseURL: API_BASE_URL,
});

instance.interceptors.request.use(
  async (config) => {
    let { accessToken } = authLocalStorage.get();

    if (isExpiredToken(accessToken) && !config.url?.includes('refresh')) {
      await refreshTokenRequest();
      accessToken = authLocalStorage.get().accessToken;
    }

    if (accessToken) {
      config.headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return config;
  },

  (error) => Promise.reject(error)
);

instance.interceptors.request.use(
  (config) => {
    const { accessToken, refreshToken } = authLocalStorage.get();

    const isRedirectToLogin =
      !config.url?.includes('static') &&
      !accessToken &&
      !refreshToken &&
      window.location.pathname !== '/login';

    if (isRedirectToLogin) {
      window.location.pathname = '/login';
    }

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,

  async (error: AxiosError<unknown, AxiosRequestConfig>) => {
    const config = error.config as AxiosRequestConfig;

    if (error.response?.status !== 401 || config.url?.includes('refresh')) {
      return Promise.reject(error);
    }

    const { refreshToken } = authLocalStorage.get();
    if (refreshToken && isExpiredToken(refreshToken)) {
      await refreshTokenRequest();
    }

    const { accessToken } = authLocalStorage.get();
    if (accessToken) {
      config.headers = { ...config.headers, Authorization: `Bearer ${accessToken}` };
    }

    return instance(config);
  }
);

export default instance;
