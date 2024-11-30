import { apiService } from '@api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { TCreateLessonId, TCreateLessonIdResponse } from './types';

export const useLessonIdCourse = (courseId: string) => {
  const queryClient = useQueryClient();
  return useMutation<TCreateLessonIdResponse, Error, TCreateLessonId>({
    mutationKey: ['lessonId'],
    mutationFn: (form: TCreateLessonId) => {
      if (form.resource instanceof FileList) {
        form.resource = form.resource[0];
      }
      if (!form.resource) {
        const isPdf = form.description === 'empty';
        form.resource = new File([new Blob([''])], `file.${isPdf ? 'pdf' : 'mp4'}`, {
          type: isPdf ? 'application/pdf' : 'video/mp4',
        });
      }
      if (!form.description) {
        form.description = 'empty';
      }
      const fd = new FormData();
      Object.entries(form).forEach(([key, value]) => fd.append(key, value));
      fd.append('courseId', courseId);
      return apiService
        .post('/lesson/create', fd, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          Object.keys(form).forEach((key) => fd.delete(key));
          return response;
        })
        .then((response) => response.data);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['lessonId'] });
    },
  });
};
