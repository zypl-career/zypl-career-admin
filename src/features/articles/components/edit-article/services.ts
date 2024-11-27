import { apiService } from '@api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { TUpdateArticleId, TUpdateArticleIdResponse } from './types';

export const useArticleUpdateById = (articleId: string) => {
  const queryClient = useQueryClient();
  return useMutation<TUpdateArticleIdResponse, Error, TUpdateArticleId>({
    mutationKey: ['articles'],
    mutationFn: (form: TUpdateArticleId) => {
      if (form.image instanceof FileList) {
        form.image = form.image[0];
      }
      const fd = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        fd.append(key, String(value)),
      );
      return apiService
        .patch(`/article/update/${articleId}`, fd, {
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
