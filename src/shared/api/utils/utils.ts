import { removeAccessToken } from '@libs';
import { Pages } from '@/shared/constants';
import { router } from '@providers';
import axios from 'axios';
import { toast } from '@ui';

export const unauthenticate = (message?: string) => {
  removeAccessToken();
  removeHeaders();
  toast({ title: 'Время авторизации закончилось', description: message });
  router.navigate(Pages.SignIn);
};

export const removeHeaders = () =>
  delete axios.defaults.headers.common['Authorization'];
