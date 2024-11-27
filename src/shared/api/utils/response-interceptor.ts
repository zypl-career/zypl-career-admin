import type { AxiosResponse } from 'axios';
import { toast } from '@ui';
import { snakeToCamel, convertNumbersToString } from '@libs';

export const responseInterceptor = (response: AxiosResponse) => {
  if (response.data && !(response.data instanceof Blob)) {
    response.data = snakeToCamel(convertNumbersToString(response.data));
  }

  if (response.data?.code > 300) {
    toast({
      title: 'Ошибка!',
      variant: 'warning',
      ...(response.data?.message ? { detail: response.data?.message } : {}),
    });
  }

  return response;
};
