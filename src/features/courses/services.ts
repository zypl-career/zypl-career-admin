import { useQuery } from '@tanstack/react-query';
import { apiService } from '@api';
import { TResponse } from '@types';
import { TCourseData } from '../../entities/courses/types';

export const useCourses = () => {
  return useQuery<TResponse<TCourseData[]>>({
    queryKey: ['courses'],
    queryFn: () => apiService.get('course/get').then(({ data }) => data),
  });
};
