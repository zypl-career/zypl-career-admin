import { apiService } from '@api';
import { TSpecialty } from '@entities';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SpecialtyEndpoints } from './constants';

export const useDeleteSpecialty = (id: TSpecialty['id']) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['specialties'],
    mutationFn: () => apiService.delete(`${SpecialtyEndpoints.delete}/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['specialties'] });
    },
  });
};
