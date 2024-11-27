import { apiService } from '@api';
import { EducationCenter } from '@entities';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TCreateEducationCenter } from './schema';

export const useCreateEducationCenter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [EducationCenter.Key],
    mutationFn: (form: TCreateEducationCenter) => {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('city', form.city);
      if (form.generalInfo) {
        formData.append('generalInfo', form.generalInfo);
      }
      if (form.image) {
        formData.append('image', form.image);
      }

      return apiService.post('/education-center/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [EducationCenter.Key] });
    },
  });
};
