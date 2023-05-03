import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '@/constans';

export const instance = axios.create({
  baseURL: API_BASE_URL,
});

export const axiosBaseQuery =
  <T>(): BaseQueryFn<AxiosRequestConfig, T> =>
  async (config: AxiosRequestConfig<T>) =>
    instance(config);
