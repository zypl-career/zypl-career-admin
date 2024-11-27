import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "@api";
import { TCreatePartner } from "./schema";

export const useCreatePartner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['partners'],
    mutationFn: (form: TCreatePartner) => {
      const formData = new FormData();
      if (form.image) {
        formData.append("image", form.image);
      }
  
      return apiService.post("/partner/create", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
    },
  });
};
