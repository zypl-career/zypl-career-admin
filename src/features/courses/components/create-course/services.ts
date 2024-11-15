import { apiService } from "@api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TCreateCourseResponse, TCreateCourse } from "./types";

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation<TCreateCourseResponse, Error, TCreateCourse>({
    mutationKey: ['courses'],
    mutationFn: (form: TCreateCourse) => {
      if (form.image instanceof FileList) {
        form.image = form.image[0];
      }
      const fd = new FormData();
      Object.entries(form).forEach(([key, value]) => fd.append(key, value instanceof File ? value : String(value)));
      return apiService
        .post("/course/create", fd, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          Object.keys(form).forEach((key) => fd.delete(key))
          return response
        })
        .then((response) => response.data)
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
};
