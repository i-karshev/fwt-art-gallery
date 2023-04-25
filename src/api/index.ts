import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axiosBaseQuery';
import { API_BASE_URL } from '../constans';

export const apiService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: () => ({}),
});
