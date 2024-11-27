import { apiService } from '@api';
import { TPartners } from '@entities';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TUpdatePartner } from './schema';

export const useUpdatePartner = (id: TPartners['id']) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['partners'],
    mutationFn: (form: TUpdatePartner) => {
      const formData = new FormData();
      if (form.image) {
        formData.append('image', form.image);
      }

      return apiService.patch(`/partner/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
    },
  });
};
