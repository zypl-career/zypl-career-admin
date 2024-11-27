import { useQuery } from "@tanstack/react-query";
import { apiService } from "@api";
import { TResponse } from '@types';
import { type TPartners, Partners } from "@entities";

export const useGetPartners = () => {
  return useQuery<TResponse<TPartners[]>>({
    queryKey: [Partners.PartnersKey],
    queryFn: () => apiService.get(Partners.PartnersPath).then(({ data }) => data),
  })
}