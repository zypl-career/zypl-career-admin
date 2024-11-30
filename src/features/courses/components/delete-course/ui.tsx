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
import { useDeleteCourse } from './services';
import { TDeleteProps } from './types';

export const DeleteCourse: FC<TDeleteProps> = ({ setOpen, open, id }) => {
  const deleteCourse = useDeleteCourse(id);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Действие безвозвратно</AlertDialogTitle>
          <AlertDialogDescription>Вы точно хотите удалить этот курс?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отменить</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteCourse.mutate()}>
            {deleteCourse.isPending && <Spinner />}
            Удалить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
