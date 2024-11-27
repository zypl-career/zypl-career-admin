import {
  AlertDialogHeader,
  AlertDialogFooter,
  Spinner,
  AlertDialogContent,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@ui";

import { FC } from "react";
import { TDeleteProps } from "./types";
import useDeleteUser from "./services";

export const DeleteUser: FC<TDeleteProps> = ({ setOpen, open, id }) => {
  const deleteUser = useDeleteUser(id);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Действие безвозвратно</AlertDialogTitle>
          <AlertDialogDescription>
            Вы точно хотите удалить пользователя?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отменить</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteUser.mutate()}>
            {deleteUser.isPending && <Spinner />}
            Удалить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
