import { apiService } from '@api';
import { TArticleData } from '@entities';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@ui';

export const useDeleteResourcesFile = (id: TArticleData['id']) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['resources-seeker-files'],
    mutationFn: () => apiService.delete(`/article/delete/${id}`).then((res) => res.data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['resources-seeker-files'] });
      toast({
        description: 'Резюме успешно удален',
        variant: 'success',
      });
    },
  });
};
