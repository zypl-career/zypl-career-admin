import { apiService } from "@api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@ui";
import { TArticleData } from "@entities";

export const useDeleteArticle = (id: TArticleData['id']) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['articles'],
    mutationFn: () => apiService.delete(`/article/delete/${id}`).then((res) => res.data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      toast({
        description: 'Статья успешно удалена',
        variant: 'success',
      });
    },
  });
}
