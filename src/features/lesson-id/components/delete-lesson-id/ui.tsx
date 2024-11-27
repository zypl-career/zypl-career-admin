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
} from '@ui';

import { FC } from 'react';
import { TDeleteProps } from './types';
import { useDeleteLesson } from './services';

export const DeleteLessonId: FC<TDeleteProps> = ({ setOpen, open, id }) => {
  const deleteLesson = useDeleteLesson(id);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Действие безвозвратно</AlertDialogTitle>
          <AlertDialogDescription>
            Вы точно хотите удалить этот урок?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отменить</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteLesson.mutate()}>
            {deleteLesson.isPending && <Spinner />}
            Удалить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
