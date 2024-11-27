import { apiService } from '@api';
import { TPartners } from '@entities';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@ui';

export const useDeletePartner = (id: TPartners['id']) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['partner'],
    mutationFn: () =>
      apiService.delete(`/partner/delete/${id}`).then((res) => res.data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['partner'] });
      toast({
        description: 'Партнер успешно удален',
        variant: 'success',
      });
    },
  });
};
