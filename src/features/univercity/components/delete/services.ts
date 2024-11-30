import { apiService } from '@api';
import { TUniversity, Universities } from '@entities';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@ui';

export const useDeleteUniversity = (id: TUniversity['id']) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [Universities.Key],
    mutationFn: () => apiService.delete(`/university/delete/${id}`).then((res) => res.data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [Universities.Key] });
      toast({
        description: 'Университет успешно удален',
        variant: 'success',
      });
    },
    onError() {
      toast({
        description: 'Ошибка при удалении университета',
        variant: 'error',
      });
    },
  });
};
