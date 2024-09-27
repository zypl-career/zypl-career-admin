import { AlertDialogHeader, AlertDialogFooter, Spinner, AlertDialogContent, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogDescription, AlertDialogTitle } from '@ui'

import { FC } from 'react'
import { TDeleteProps } from './types'
import { useDeleteCourse } from './services'

export const DeleteCourse: FC<TDeleteProps> = ({ setOpen, open, id }) => {
  const deleteCourse = useDeleteCourse(id)
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Действие безвозвратно</AlertDialogTitle>
          <AlertDialogDescription>
            Вы точно хотите удалить этот курс?
          </AlertDialogDescription>
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
  )
}
