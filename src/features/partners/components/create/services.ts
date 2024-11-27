import { apiService } from '@api';
import { Partners } from '@entities';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TCreatePartner } from './schema';

export const useCreatePartner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [Partners.Key],
    mutationFn: (form: TCreatePartner) => {
      const formData = new FormData();
      if (form.image) {
        formData.append('image', form.image);
      }

      return apiService.post('/partner/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [Partners.Key] });
    },
  });
};
