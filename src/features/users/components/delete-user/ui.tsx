import { FC } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Spinner,
} from '@ui';
import useDeleteUser from './services';
import { TDeleteProps } from './types';

export const DeleteUser: FC<TDeleteProps> = ({ setOpen, open, id }) => {
  const deleteUser = useDeleteUser(id);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Действие безвозвратно</AlertDialogTitle>
          <AlertDialogDescription>Вы точно хотите удалить пользователя?</AlertDialogDescription>
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
