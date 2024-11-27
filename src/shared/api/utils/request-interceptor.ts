import { getAccessToken } from '@libs';
import type { InternalAxiosRequestConfig } from 'axios';

export const requestInterceptor = (config: InternalAxiosRequestConfig<any>) => {
  authInterceptor(config);
  return config;
};

const authInterceptor = (config: InternalAxiosRequestConfig<any>) => {
  const authToken = getAccessToken();
  if (authToken) {
    config.headers = Object.assign({}, config.headers, {
      Authorization: `Bearer ${authToken}`,
    });
  }

  return config;
};
