import { apiService } from '@api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { TUpdateLessonId, TUpdateLessonIdResponse } from './types';

export const useLessonUpdateById = (courseId: string, lessonId: string) => {
  const queryClient = useQueryClient();
  return useMutation<TUpdateLessonIdResponse, Error, TUpdateLessonId>({
    mutationKey: ['lessonId'],
    mutationFn: (form: TUpdateLessonId) => {
      if (form.resource instanceof FileList) {
        form.resource = form.resource[0];
      }
      const fd = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        fd.append(key, String(value)),
      );
      fd.append('courseId', courseId);
      return apiService
        .patch(`/lesson/update/${lessonId}`, fd, {
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
