import { apiService } from '@api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Specialty } from '../../constants';
import { TSpecialty } from '../../types';
import { SpecialtyEndpoints } from './constants';

export const useDeleteSpecialty = (id: TSpecialty['id']) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [Specialty.SpecialtyKey],
    mutationFn: () =>
      apiService.delete(`${SpecialtyEndpoints.delete}/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Specialty.SpecialtyKey] });
    },
  });
};
