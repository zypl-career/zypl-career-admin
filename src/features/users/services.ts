import { apiService } from '@api';
import { TUser } from '@entities';
import { useQuery } from '@tanstack/react-query';
import { User, UserEndpoints } from './constants';

export const useUser = () => {
  return useQuery<TUser>({
    queryKey: [User.UserKey],
    queryFn: () => apiService.get(UserEndpoints.UserGet).then(({ data }) => data),
  });
};
