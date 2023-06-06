import axios from 'axios';

import { API_BASE_URL } from '@/constans';
import {
  onRequest,
  onRequestError,
  onResponse,
  onResponseError,
} from '@/utils/auth/interceptorHandles';

const instance = axios.create({
  baseURL: API_BASE_URL,
});

instance.interceptors.request.use(onRequest, onRequestError);
instance.interceptors.response.use(onResponse, onResponseError);

export default instance;
