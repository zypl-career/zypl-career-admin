import { apiService } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';
import { User } from './constants';

export const useUser = () => {
  return useQuery({
    queryKey: [User.UserKey],
    queryFn: () => apiService.get<User>(User.UserKey).then(({ data }) => data),
  });
};
