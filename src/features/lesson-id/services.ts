import { apiService } from '@api';
import { TLessonIdData } from '@entities';
import { useQuery } from '@tanstack/react-query';

export const useLessonId = (courseId: string) => {
  return useQuery<TLessonIdData[]>({
    queryKey: ['lessonId', courseId],
    queryFn: () => apiService.get(`lesson/by-course/${courseId}`).then(({ data }) => data),
  });
};

export const useLessonById = (id: string) => {
  return useQuery<TLessonIdData>({
    queryKey: ['lessonId', id],
    queryFn: () => apiService.get(`lesson/get/${id}`).then(({ data }) => data),
    enabled: !!id,
  });
};
