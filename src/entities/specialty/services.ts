import { apiService } from '@api';
import { useQuery } from '@tanstack/react-query';
import { TResponse } from '@types';
import { Specialty } from './constants';
import { TSpecialty } from './types';

export const useGetSpecialty = () => {
  return useQuery<TResponse<TSpecialty[]>, Error, TSpecialty[]>({
    queryKey: [Specialty.SpecialtyKey],
    queryFn: () => apiService.get(Specialty.SpecialtyPath).then(({ data }) => data),
    select: ({ data }) => data,
  });
};
