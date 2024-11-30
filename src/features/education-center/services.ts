import { apiService } from '@api';
import { EducationCenter, TEducationCenter } from '@entities';
import { useQuery } from '@tanstack/react-query';
import { TResponse } from '@types';

export const useGetEducationCenters = (filters: { city?: string; title?: string; limit?: number; page?: number }) => {
  return useQuery<TResponse<TEducationCenter[]>>({
    queryKey: [EducationCenter.Key, filters],
    queryFn: () => apiService.get(EducationCenter.Path, { params: filters }).then(({ data }) => data),
  });
};
