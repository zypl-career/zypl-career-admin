import { AxiosError } from 'axios';
import { AxiosErrorResponse } from '../types';
import { errorStatus } from './error-statuses';

export const errorInterceptor = (error: AxiosError<AxiosErrorResponse>) => {
  const status = error.response?.status ?? 0;

  if (status in errorStatus) {
    errorStatus[status](error.message || '');
  }
  
  return Promise.reject(error);
};
