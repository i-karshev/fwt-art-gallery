import { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import instance from '@/api/instance';
import { AuthResponse } from '@/api/features/authApi';
import { authLocalStorage } from '@/utils/auth/authLocalStorage';
import { getFingerprint } from '@/utils/auth/getFingerprint';
import { isExpiredToken } from '@/utils/auth/isExpiredToken';

let refreshTokenPromise: Promise<unknown> | null = null;

const redirectToLogin = () => {
  if (
    !window.location.pathname.includes('login') &&
    !window.location.pathname.includes('register')
  ) {
    window.location.pathname = '/login';
  }
};

const onRefreshToken = async () => {
  if (refreshTokenPromise) {
    await refreshTokenPromise;
    refreshTokenPromise = null;

    return Promise.resolve();
  }

  const { refreshToken } = authLocalStorage.get();
  const fingerprint = await getFingerprint();

  if (refreshToken && !isExpiredToken(refreshToken)) {
    refreshTokenPromise = instance('/auth/refresh', {
      method: 'POST',
      data: { refreshToken, fingerprint },
    });

    await refreshTokenPromise;
    refreshTokenPromise = null;

    return Promise.resolve();
  }

  authLocalStorage.remove();
  redirectToLogin();

  return Promise.reject();
};

export const onRequest = async (config: InternalAxiosRequestConfig) => {
  if (config.url?.includes('auth') || config.url?.includes('static')) {
    return config;
  }

  let { accessToken } = authLocalStorage.get();

  if (isExpiredToken(accessToken)) {
    await onRefreshToken();
    accessToken = authLocalStorage.get().accessToken;
  }

  if (accessToken) {
    config.headers.set('Authorization', `Bearer ${accessToken}`);
  }

  return config;
};

export const onRequestError = (error: AxiosError): Promise<AxiosError> => Promise.reject(error);

export const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  if (error?.response?.status !== 401) {
    return Promise.reject(error);
  }
  const config = error.config as AxiosRequestConfig;

  if (config.url?.includes('auth') || config.url?.includes('static')) {
    return Promise.reject(error);
  }

  const { refreshToken } = authLocalStorage.get();

  if (refreshToken) {
    await onRefreshToken();
    const { accessToken } = authLocalStorage.get();

    if (accessToken) {
      config.headers = { ...config.headers, Authorization: `Bearer ${accessToken}` };
      return instance(config);
    }
  }

  return Promise.reject();
};

export const onResponse = (response: AxiosResponse): AxiosResponse => {
  if (response.config.url?.includes('auth')) {
    authLocalStorage.set(response.data as AuthResponse);
  }

  return response;
};
