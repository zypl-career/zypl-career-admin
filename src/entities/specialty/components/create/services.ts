import { apiService } from '@api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SpecialtyEndpoints } from './constants';
import { TCreateSpecialty } from './schema';

export const useCreateSpecialty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['specialties'],
    mutationFn: (form: TCreateSpecialty) => apiService.post(SpecialtyEndpoints.create, form),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['specialties'] });
    },
  });
};
