import { apiService } from "@/shared/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { User, UserEndpoints } from "../../constants"
import { TUserSchema } from "./types"
import { TUserData } from "@entities"
import { toast } from "@ui"

export const useEditUser = (id: TUserData['id']) => {
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, Partial<TUserSchema>>({
    mutationFn: (form: Partial<TUserSchema>) => apiService.patch(`${UserEndpoints.UserEdit}/${id}`, form).then(({ data }) => data),
    onSuccess() {
      toast({ title: 'Успешно', description: 'Пользователь успешно изменен', variant: 'success' });
      queryClient.invalidateQueries({ queryKey: [User.UserKey] });
    },
  })
}