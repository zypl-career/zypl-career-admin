import { FC } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  Spinner,
} from "@ui";

import { TDeleteEducationCenterProps } from "./types";
import { useDeleteEducationCenter } from "./services";

export const DeleteEducationCenter: FC<TDeleteEducationCenterProps> = ({
  setOpen,
  open,
  id,
}) => {
  const deleteEducationCenter = useDeleteEducationCenter(id);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Действие безвозвратно</AlertDialogTitle>
          <AlertDialogDescription>
            Вы уверены, что хотите удалить этот образовательный центр?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отменить</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteEducationCenter.mutate()}>
            {deleteEducationCenter.isPending && <Spinner />}
            Удалить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
