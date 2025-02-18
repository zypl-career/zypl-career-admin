import { apiService } from '@api';
import { TArticleData } from '@entities';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TResponse } from '@types';

export const useGetVideoGuide = () => {
  return useQuery<TResponse<TArticleData[]>, Error, TArticleData[]>({
    queryKey: ['video-guide'],
    queryFn: () =>
      apiService
        .get('article/get', {
          params: {
            sections: ['User Guide Videos'],
          },
        })
        .then(({ data }) => data),
    select: (articles) => {
      const videos = articles.data.filter(
        (item) => item.image.endsWith('.mp4') || item.description.startsWith('https:'),
      );
      return videos.sort((a, b) => new Date(String(b.createdAt)).getTime() - new Date(String(a.createdAt)).getTime());
    },
  });
};

export const useDeleteVideoGuide = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['video-guide'],
    mutationFn: async (id: TArticleData['id']) => apiService.delete(`/article/delete/${id}`).then(({ data }) => data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['video-guide'] });
    },
  });
};
