import { apiService } from '@api';
import { TUserFastData } from '@entities';
import { useQuery } from '@tanstack/react-query';
import { TResponse } from '@types';
import { User, UserEndpoints } from './constants';

export const useUserFast = () => {
  return useQuery<TResponse<TUserFastData[]>>({
    queryKey: [User.UserKey],
    queryFn: () => apiService.get(UserEndpoints.UserFastGet).then(({ data }) => data),
  });
};
