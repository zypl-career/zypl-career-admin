import { apiService } from '@api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TVideoGuideSchema } from './types';

export const useCreateVideoGuide = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['video-guide'],
    mutationFn: async (form: TVideoGuideSchema) => {
      const fd = new FormData();

      const description = form.description
        ? form.description.includes('youtube')
          ? form.description.replace('/watch?v=', '/embed/')
          : form.description
        : 'empty';

      fd.append('image', form.image || new File([], 'empty.jpg'));

      fd.append('title', form.title);
      fd.append('generalInfo', form.generalInfo);
      fd.append('description', description);
      fd.append('type', 'student');
      fd.append('minutesRead', '0');
      fd.append('hashtags', '0');
      fd.append('sections', 'User Guide Videos');

      return apiService
        .post('/article/create', fd, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          Object.keys(form).forEach((key) => fd.delete(key));
          return response.data;
        });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['video-guide'] });
    },
  });
};
