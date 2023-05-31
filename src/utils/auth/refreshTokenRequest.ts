import { authApi } from '@/api/features/authApi';
import { store } from '@/index';
import { authActions } from '@/store/reducers/AuthSlice';
import { authLocalStorage } from '@/utils/auth/authLocalStorage';
import { isExpiredToken } from '@/utils/auth/isExpiredToken';
import { getFingerprint } from '@/utils/auth/getFingerprint';

let refreshTokenPromise: Promise<unknown> | null = null;

export const refreshTokenRequest = async () => {
  if (!refreshTokenPromise) {
    return;
  }

  const { refreshToken } = authLocalStorage.get();

  if (refreshToken && isExpiredToken(refreshToken)) {
    const fingerprint = await getFingerprint();
    refreshTokenPromise = store.dispatch(
      authApi.endpoints.refresh.initiate({ refreshToken, fingerprint })
    );

    await refreshTokenPromise
      .then(() => {
        refreshTokenPromise = null;
      })
      .catch(() => {
        authLocalStorage.remove();
        store.dispatch(authActions.logout());
      });
  }
};
