import { apiService } from '@api';
import { Specialty, type Specialty as SpecialtyType } from '@entities';
import { useQuery } from '@tanstack/react-query';
import { TResponse } from '@types';

export const useGetSpecialty = () => {
  return useQuery<TResponse<SpecialtyType[]>>({
    queryKey: [Specialty.SpecialtyKey],
    queryFn: () => apiService.get(Specialty.SpecialtyPath).then(({ data }) => data),
  });
};
