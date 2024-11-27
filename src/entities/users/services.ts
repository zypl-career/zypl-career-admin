import { useQuery } from '@tanstack/react-query';
import { User } from './constants';
import { apiService } from '@/shared/api';

export const useUser = () => {
  return useQuery({
    queryKey: [User.UserKey],
    queryFn: () => apiService.get<User>(User.UserKey).then(({ data }) => data),
  });
};
