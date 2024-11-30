import { apiService } from '@api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TCreateArticle, TCreateArticleResponse } from './types';

export const useCreateArticle = () => {
  const queryClient = useQueryClient();
  return useMutation<TCreateArticleResponse, Error, TCreateArticle>({
    mutationKey: ['articles'],
    mutationFn: (form: TCreateArticle) => {
      if (form.image instanceof FileList) {
        form.image = form.image[0];
      }
      const fd = new FormData();
      Object.entries(form).forEach(([key, value]) => fd.append(key, Array.isArray(value) ? value.join(',') : value));
      return apiService
        .post('/article/create', fd, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          Object.keys(form).forEach((key) => fd.delete(key));
          return response;
        })
        .then((response) => response.data);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};
