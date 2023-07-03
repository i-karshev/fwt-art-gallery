import { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import instance from './instance';

export const axiosBaseQuery =
  <T>(): BaseQueryFn<AxiosRequestConfig, T> =>
  async (config: AxiosRequestConfig<T>) => {
    try {
      return await instance(config);
    } catch (axiosError) {
      return {
        error: (axiosError as AxiosError).response?.data,
      };
    }
  };
