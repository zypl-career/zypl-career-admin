import { apiService } from '@/shared/api';
import { TUserData } from '@entities';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@ui';
import { User, UserEndpoints } from '../../constants';
import { TUserSchema } from './types';

export const useEditUser = (id: TUserData['id']) => {
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, Partial<TUserSchema>>({
    mutationFn: (form: Partial<TUserSchema>) =>
      apiService
        .patch(`${UserEndpoints.UserEdit}/${id}`, form)
        .then(({ data }) => data),
    onSuccess() {
      toast({
        title: 'Успешно',
        description: 'Пользователь успешно изменен',
        variant: 'success',
      });
      queryClient.invalidateQueries({ queryKey: [User.UserKey] });
    },
  });
};
