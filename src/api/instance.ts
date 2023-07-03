import axios from 'axios';

import {
  onRequest,
  onRequestError,
  onResponse,
  onResponseError,
} from '@/utils/auth/interceptorHandles';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const instance = axios.create({
  baseURL: API_BASE_URL,
});

instance.interceptors.request.use(onRequest, onRequestError);
instance.interceptors.response.use(onResponse, onResponseError);

export default instance;
