import { useQuery } from '@tanstack/react-query';
import { apiService } from '@api';
import { TResponse } from '@types';
import { TArticleData } from '@entities';

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
