import { TUserData } from '@/entities';
import { apiService } from '@api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@ui';
import { User } from '../../constants';

export default function useDeleteUser(id: TUserData['id']) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiService.delete(`/users/${id}`).then((res) => res.data),
    onSuccess() {
      toast({
        description: 'Пользователь успешно удален',
        variant: 'success',
      });
      queryClient.invalidateQueries({ queryKey: [User.UserKey] });
    },
  });
}
