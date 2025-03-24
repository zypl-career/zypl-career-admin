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
  toast,
} from '@ui';
import { useDeleteSpecialty } from './services';
import { TDeleteSpecialtyProps } from './types';

export const DeleteSpecialty: FC<TDeleteSpecialtyProps> = ({ setOpen, open, id = '' }) => {
  const deleteSpecialty = useDeleteSpecialty(id);

  const handleDeleteSpecialty = () => {
    deleteSpecialty.mutate(undefined, {
      onSuccess: () => {
        toast({
          description: 'Специальность успешно удалена',
          variant: 'success',
        });
        setOpen(false);
      },
      onError: (error: any) => {
        if (error.response && error.response.status === 404) {
          toast({
            description: 'Специальность не найдена',
            variant: 'destructive',
          });
        } else {
          toast({
            description: 'Произошла ошибка при удалении специальности',
            variant: 'destructive',
          });
        }
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Действие безвозвратно</AlertDialogTitle>
          <AlertDialogDescription>Вы уверены, что хотите удалить эту специальность?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отменить</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteSpecialty}>
            {deleteSpecialty.isPending && <Spinner />}
            Удалить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
