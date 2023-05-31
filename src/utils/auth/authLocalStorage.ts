import { AuthResponse } from '@/api/features/authApi';

interface Auth {
  get: () => { accessToken: string | null; refreshToken: string | null };
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
