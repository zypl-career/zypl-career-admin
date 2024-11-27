import { apiService } from '@/shared/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TUpdateCourse } from './types';
import { TCourseData } from '@entities';

export const useEditCourse = (id: TCourseData['id']) => {
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, TUpdateCourse>({
    mutationKey: ['courses'],
    mutationFn: (form: TUpdateCourse) =>
      apiService.patch(`/course/update/${id}`, form).then(({ data }) => data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
};

export const useCourseById = (id: TCourseData['id']) => {
  return useQuery<TCourseData>({
    queryKey: ['courses', id],
    queryFn: () => apiService.get(`course/get/${id}`).then(({ data }) => data),
    enabled: !!id,
  });
};
