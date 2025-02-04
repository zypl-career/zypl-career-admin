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
      const description: ResourcesSeekerFiles[] = articles.data.map((item) => {
        const parsedDescription = JSON.parse(item.description) as Description[];
        const descriptionItem = parsedDescription.find((desc) => desc.type === 'file');
        return descriptionItem ? { ...item, description: parsedDescription } : {};
      }) as ResourcesSeekerFiles[];

      return (
        removeEmpty(
          description.sort((a, b) => new Date(String(b.createdAt)).getTime() - new Date(String(a.createdAt)).getTime()),
        ) ?? []
      );
    },
  });
};
