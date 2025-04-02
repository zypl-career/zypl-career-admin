import { apiService } from '@api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TSpecialty } from '../../types';
import { SpecialtyEndpoints } from './constants';
import { TCreateSpecialty } from './schema';

export const useUpdateSpecialty = (id: TSpecialty['id']) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['specialties'],
    mutationFn: (form: TCreateSpecialty) =>
      apiService.post(`${SpecialtyEndpoints.update}/${id}`, form),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['specialties'] });
    },
  });
};
