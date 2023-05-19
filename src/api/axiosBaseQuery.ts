import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosError } from 'axios';
import type { AxiosRequestConfig } from 'axios';
import jwt from 'jwt-decode';

import { API_BASE_URL } from '@/constans';
import { authApi } from '@/api/authApi';
import { getFingerprint } from '@/utils/getFingerprint';
import { store } from '@/index';
import { authLocalStorage } from '@/utils/authLocalStorage';

export const instance = axios.create({
  baseURL: API_BASE_URL,
});

instance.interceptors.request.use(
  async (config) => {
    let { accessToken } = authLocalStorage.get();

    if (accessToken) {
      const currentDate = new Date();
      const decodedToken: { exp: number } = jwt(accessToken);

      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const { refreshToken } = authLocalStorage.get();

        if (refreshToken) {
          const fingerprint = await getFingerprint();
          store.dispatch(authApi.endpoints.refresh.initiate({ refreshToken, fingerprint }));
          accessToken = authLocalStorage.get().accessToken;
        }
      }
    }

    if (accessToken) {
      config.headers.set('Authorization', `Bearer ${accessToken}`);
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

      if (refreshToken) {
        const fingerprint = await getFingerprint();
        store.dispatch(authApi.endpoints.refresh.initiate({ refreshToken, fingerprint }));
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

export const axiosBaseQuery =
  <T>(): BaseQueryFn<AxiosRequestConfig, T> =>
  async (config: AxiosRequestConfig<T>) =>
    instance(config);
