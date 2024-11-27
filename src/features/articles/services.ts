import { apiService } from '@api';
import { TArticleData } from '@entities';
import { useQuery } from '@tanstack/react-query';
import { TResponse } from '@types';

export const useArticles = () => {
  return useQuery<TResponse<TArticleData[]>>({
    queryKey: ['articles'],
    queryFn: () => apiService.get('article/get').then(({ data }) => data),
  });
};

export const useArticleId = (id: TArticleData['id']) => {
  return useQuery<TArticleData>({
    queryKey: ['articles', id],
    queryFn: () => apiService.get(`article/get/${id}`).then(({ data }) => data),
  });
};
