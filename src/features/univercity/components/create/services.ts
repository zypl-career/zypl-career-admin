import { apiService } from '@api';
import { Universities } from '@entities';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TCreateUniversity } from './schema';

export const useCreateUniversity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [Universities.Key],
    mutationFn: (form: TCreateUniversity) => apiService.post('/university/create', form),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [Universities.Key] });
    },
  });
};
