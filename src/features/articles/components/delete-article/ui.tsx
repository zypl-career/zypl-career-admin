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
import { useDeleteArticle } from "./services";

export const DeleteArticle: FC<TDeleteProps> = ({setOpen, open, id}) => {
  const deleteArticle = useDeleteArticle(id);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Действие безвозвратно</AlertDialogTitle>
          <AlertDialogDescription>
            Вы точно хотите удалить эту статью?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отменить</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteArticle.mutate()}>
            {deleteArticle.isPending && <Spinner />}
            Удалить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
