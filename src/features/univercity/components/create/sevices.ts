import { apiService } from '@api';
import { Universities } from '@entities';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TCreateUniversity } from './schema';

export const useCreateUniversity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [Universities.Key],
    mutationFn: (form: TCreateUniversity) => {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('city', form.city);
      if (form.generalInfo) {
        formData.append('generalInfo', form.generalInfo);
      }

      return apiService.post('/university/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [Universities.Key] });
    },
  });
};
