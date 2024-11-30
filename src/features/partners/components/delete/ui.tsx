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
import { useDeletePartner } from './services';
import { TDeletePartnerProps } from './types';

export const DeletePartner: FC<TDeletePartnerProps> = ({ setOpen, open, id = '' }) => {
  const deletePartner = useDeletePartner(id);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Действие безвозвратно</AlertDialogTitle>
          <AlertDialogDescription>Вы уверены, что хотите удалить этого партнера?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отменить</AlertDialogCancel>
          <AlertDialogAction onClick={() => deletePartner.mutate()}>
            {deletePartner.isPending && <Spinner />}
            Удалить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
