import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axiosBaseQuery';

export const apiService = createApi({
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
});
