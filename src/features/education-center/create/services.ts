import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "@api";
import { TCreateEducationCenter } from "./schema";

export const useCreateEducationCenter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["education-center"],
    mutationFn: (form: TCreateEducationCenter) => {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("city", form.city);
      if (form.generalInfo) {
        formData.append("generalInfo", form.generalInfo);
      }
      if (form.image) {
        formData.append("image", form.image);
      }

      return apiService.post("/education-center/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["education-center"] });
    },
  });
};
