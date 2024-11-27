import { useMutation } from "@tanstack/react-query";
import { apiService } from "@api";
import { TCreatePartner } from "./types";

export const useCreatePartner = () => {
  return useMutation((data: TCreatePartner) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.image) {
      formData.append("image", data.image);
    }
    formData.append("createdAt", data.createdAt || "");

    return apiService.post("/partners/create", formData);
  });
};
