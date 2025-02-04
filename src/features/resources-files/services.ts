import { apiService } from '@api';
import { TArticleData } from '@entities';
import { removeEmpty } from '@libs';
import { useQuery } from '@tanstack/react-query';
import { TResponse } from '@types';
import { Description, ResourcesSeekerFiles } from './types';

export const useResourcesSeekerFiles = () => {
  return useQuery<TResponse<TArticleData[]>, Error, ResourcesSeekerFiles[]>({
    queryKey: ['resources-seeker-files'],
    queryFn: () => apiService.get('article/get').then(({ data }) => data),
    select: (articles) => {
      const description = articles.data.map((item) =>
        (JSON.parse(item.description) as Description[]).filter((item) => item.type === 'file'),
      );
      const files = articles.data
        .map((item, i) => ({
          ...(description[i]?.length ? { ...item, description: description.flat() ?? [] } : {}),
        }))
        .sort((a, b) => new Date(String(b.createdAt)).getTime() - new Date(String(a.createdAt)).getTime());
      return removeEmpty(files) ?? [];
    },
  });
};
