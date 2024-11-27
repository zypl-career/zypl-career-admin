import { apiService } from "@api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@ui";
import { type TLessonIdData } from "@entities";

export const useDeleteLesson = (id: TLessonIdData["id"]) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["lessonId"],
    mutationFn: () =>
      apiService.delete(`/lesson/delete/${id}`).then((res) => res.data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["lessonId"] });
      toast({
        description: "Урок успешно удален",
        variant: "success",
      });
    },
  });
};
