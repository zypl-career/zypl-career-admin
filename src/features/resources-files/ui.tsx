import { TArticleData } from '@/entities';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FC, useCallback, useState } from 'react';
import { Button, Form, Spinner, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, toast } from '@ui';
import {
  AddResourcesFile,
  AddResourcesFileSchema,
  DeleteResourcesFile,
  TableResourcesFile,
  TAddResourcesFile,
  useAddResourcesFile,
} from './components';
import { useResourcesSeekerFiles } from './services';

export const ResourcesSeekerFiles: FC = () => {
  const { data, isLoading } = useResourcesSeekerFiles();
  const [isAdding, setIsAdding] = useState(false);
  const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<TArticleData['id']>('');
  const form = useForm<TAddResourcesFile>({
    defaultValues: {
      title: '',
      word: undefined,
      pdf: undefined,
    },
    resolver: zodResolver(AddResourcesFileSchema),
    mode: 'onSubmit',
  });

  const addResourcesFile = useAddResourcesFile();

  const deleteHandler = useCallback((id: TArticleData['id']) => {
    setToggleDeleteModal(true);
    setDeleteId(id);
  }, []);

  const submitHandler = useCallback(
    (data: TAddResourcesFile) => {
      addResourcesFile.mutate(data, {
        onSuccess() {
          form.reset();
          setIsAdding(false);
          toast({ title: 'Резюме успешно добавлено!' });
        },
      });
    },
    [addResourcesFile, form],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)}>
        <header className="mb-5 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Резюме</h1>
          <div className=" flex items-center gap-4">
            {!isAdding ? (
              <Button type="button" onClick={() => setIsAdding(true)}>
                Добавить резюме
              </Button>
            ) : (
              <>
                <Button type="button" onClick={() => setIsAdding(false)} variant="secondary">
                  Отменить
                </Button>
                <Button isLoading={addResourcesFile.isPending}>Сохранить</Button>
              </>
            )}
          </div>
        </header>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Название</TableHead>
              <TableHead>Word</TableHead>
              <TableHead>PDF</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <Spinner />
                </TableCell>
              </TableRow>
            ) : (
              <>
                {isAdding ? <AddResourcesFile control={form.control} /> : null}
                <TableResourcesFile data={data ?? []} onDelete={deleteHandler} />
                <DeleteResourcesFile id={deleteId} open={toggleDeleteModal} setOpen={setToggleDeleteModal} />
              </>
            )}
          </TableBody>
        </Table>
      </form>
    </Form>
  );
};
