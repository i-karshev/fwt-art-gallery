import jwt from 'jwt-decode';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

import { authApi, AuthResponse } from '@/api/features/authApi';
import { store } from '@/index';
import { authActions } from '@/store/reducers/AuthSlice';

interface Auth {
  get: () => {
    accessToken: string | null;
    refreshToken: string | null;
  };
  set: (data: AuthResponse) => void;
  remove: () => void;
}

export const authLocalStorage: Auth = {
  get: () => {
    const accessToken = localStorage.getItem('jwt-access');
    const refreshToken = localStorage.getItem('jwt-refresh');

    return { accessToken, refreshToken };
  },
  set: (data: AuthResponse) => {
    localStorage.setItem('jwt-access', data.accessToken);
    localStorage.setItem('jwt-refresh', data.refreshToken);
  },
  remove: () => {
    localStorage.removeItem('jwt-access');
    localStorage.removeItem('jwt-refresh');
  },
};

export const getFingerprint = async () => {
  const fp = await FingerprintJS.load();
  const { visitorId } = await fp.get();

  return visitorId;
};

export const isExpiredToken = (token: string | null): boolean => {
  if (!token) {
    return true;
  }

  const currentDate = new Date();
  const decodedToken: { exp: number } = jwt(token);

  return decodedToken.exp * 1000 < currentDate.getTime();
};

let isRefreshing = false;

export const refreshTokenRequest = async () => {
  if (!isRefreshing) {
    isRefreshing = true;

    const { refreshToken } = authLocalStorage.get();

    if (refreshToken) {
      if (isExpiredToken(refreshToken)) {
        authLocalStorage.remove();
        store.dispatch(authActions.logout());

        return;
      }

      const fingerprint = await getFingerprint();
      await store.dispatch(authApi.endpoints.refresh.initiate({ refreshToken, fingerprint }));
    }
  }
};
