import { apiService } from '@api';
import { TUniversity, Universities } from '@entities';
import { useQuery } from '@tanstack/react-query';
import { TResponse } from '@types';

export const useGetUniversities = () => {
  return useQuery<TResponse<TUniversity[]>>({
    queryKey: [Universities.Key],
    queryFn: () => apiService.get(Universities.Path).then(({ data }) => data),
  });
};
