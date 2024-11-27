import { apiService } from '@api';
import { Partners, type TPartners } from '@entities';
import { useQuery } from '@tanstack/react-query';
import { TResponse } from '@types';

export const useGetPartners = () => {
  return useQuery<TResponse<TPartners[]>>({
    queryKey: [Partners.PartnersKey],
    queryFn: () =>
      apiService.get(Partners.PartnersPath).then(({ data }) => data),
  });
};
