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
} from '@ui';

import { FC } from 'react';
import { TDeletePartnerProps } from './types';
import { useDeletePartner } from './services';

export const DeletePartner: FC<TDeletePartnerProps> = ({ setOpen, open, id }) => {
    const deletePartner = useDeletePartner(id);

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Действие безвозвратно</AlertDialogTitle>
                    <AlertDialogDescription>
                        Вы уверены, что хотите удалить этого партнера?
                    </AlertDialogDescription>
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
