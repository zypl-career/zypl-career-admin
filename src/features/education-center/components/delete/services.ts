import { apiService } from '@api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EducationCenter } from '@entities';
import { toast } from '@ui';
import { TEducationCenterData } from './types.ts';

export const useDeleteEducationCenter = (id: TEducationCenterData['id']) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [EducationCenter.Key, id],
    mutationFn: () =>
      apiService
        .delete(`/education-center/delete/${id}`)
        .then((res) => res.data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [EducationCenter.Key, id] });
      toast({
        description: 'Образовательный центр успешно удален',
        variant: 'success',
      });
    },
  });
};
