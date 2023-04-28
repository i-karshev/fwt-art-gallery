import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios from 'axios';
import type { AxiosRequestConfig, AxiosError } from 'axios';
import { API_BASE_URL } from '@/constans';

const instance = axios.create({
  baseURL: API_BASE_URL,
});

export const axiosBaseQuery =
  <T>(): BaseQueryFn<AxiosRequestConfig, T> =>
  async (config: AxiosRequestConfig<T>) => {
    try {
      return await instance(config);
    } catch (axiosError) {
      return {
        error: axiosError as AxiosError,
      };
    }
  };
