import { useQuery } from '@tanstack/react-query';
import { apiService } from '@api';
import { TResponse } from '@types';
import { TEducationCenter, EducationCenter } from '@entities';

export const useGetEducationCenters = (filters: {
  city?: string;
  title?: string;
  limit?: number;
  page?: number;
}) => {
  return useQuery<TResponse<TEducationCenter[]>>({
    queryKey: [EducationCenter.Key, filters],
    queryFn: () =>
      apiService
        .get(EducationCenter.Path, { params: filters })
        .then(({ data }) => data),
  });
};
