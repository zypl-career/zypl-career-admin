import { apiService } from '@api';
import { TCourseData } from '@entities';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@ui';

export const useDeleteCourse = (id: TCourseData['id']) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['courses'],
    mutationFn: () =>
      apiService.delete(`/course/delete/${id}`).then((res) => res.data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast({
        description: 'Курс успешно удален',
        variant: 'success',
      });
    },
  });
};
