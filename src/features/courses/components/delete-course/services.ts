import { apiService } from "@api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@ui";
import { TCourseData } from "@entities";

export const useDeleteCourse = (id: TCourseData["id"]) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["courses"],
    mutationFn: () =>
      apiService.delete(`/course/delete/${id}`).then((res) => res.data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast({
        description: "Курс успешно удален",
        variant: "success",
      });
    },
  });
};
