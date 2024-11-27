import axios from 'axios';
import {
  errorInterceptor,
  requestInterceptor,
  responseInterceptor,
} from './utils';

export const apiService = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiService.interceptors.response.use(responseInterceptor, errorInterceptor);
apiService.interceptors.request.use(requestInterceptor);
