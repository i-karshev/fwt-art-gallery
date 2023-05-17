import { apiService } from '@/api/index';

interface AuthDto {
  username: string;
  password: string;
  fingerprint?: string;
}

interface RefreshTokenDto {
  refreshToken: string;
  fingerprint?: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export const authApi = apiService.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<AuthResponse, AuthDto>({
      query: (data) => ({ method: 'POST', url: '/auth/register', data }),
    }),
    login: build.mutation<AuthResponse, AuthDto>({
      query: (data) => ({ method: 'POST', url: '/auth/login', data }),
    }),
    refresh: build.mutation<AuthResponse, RefreshTokenDto>({
      query: (data) => ({ method: 'POST', url: '/auth/refresh', data }),
    }),
  }),
});
