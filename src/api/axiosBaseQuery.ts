import { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosRequestConfig } from 'axios';
import { instance } from '@/api/instance';

export const axiosBaseQuery =
  <T>(): BaseQueryFn<AxiosRequestConfig, T> =>
  async (config: AxiosRequestConfig<T>) =>
    instance(config);
