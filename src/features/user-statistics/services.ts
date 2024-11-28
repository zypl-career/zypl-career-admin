import { apiService } from '@api';
import { useQuery } from '@tanstack/react-query';

export const useGetUserStatistics = () => {
  return useQuery({
    queryKey: ['user-statistics'],
    queryFn: () => apiService.get('/statistics/users').then((res) => res.data),
  });
};
