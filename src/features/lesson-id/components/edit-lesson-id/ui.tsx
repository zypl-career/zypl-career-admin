import { useLessonById } from '@/features/lesson-id/services.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { setFieldError } from '@libs';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { FC, useMemo } from 'react';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Modal,
  Spinner,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  toast,
} from '@ui';
import { UpdateLessonIdSchema } from './schema';
import { useLessonUpdateById } from './services';
import { TUpdateLessonId, TUpdateLessonProps } from './types';

export const UpdateLesson: FC<TUpdateLessonProps> = ({ data, open, setOpen }) => {
  const { id = '' } = useParams();
  const { data: lessonData, isLoading: lessonLoading } = useLessonById(data?.id || '');
  const form = useForm<TUpdateLessonId>({
    resolver: zodResolver(UpdateLessonIdSchema),
    values: {
      description: '',
      resource: undefined,
      name: '',
      ...data,
      ...lessonData,
    },
    mode: 'all',
  });

  const placeholderLoading = useMemo(
    () => (lessonLoading ? 'Подгружаем данные ...' : 'https://example.com'),
    [lessonLoading],
  );

  const updateLesson = useLessonUpdateById(id, data?.id || '');
  const handleClose = () => {
    setOpen(false);
    form.reset();
  };

  const onSubmit = (data: TUpdateLessonId) => {
    updateLesson.mutate(data, {
      onError() {
        setFieldError(form);
      },
      onSuccess() {
        toast({ title: 'Урок успешно обновлен' });
        handleClose();
      },
    });
  };

  return (
    <Modal setToggle={setOpen} toggle={open}>
      <h1 className="text-4xl font-bold">Изменить урок</h1>
      <main className="flex flex-col gap-6 rounded bg-white">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input label="Заголовок" placeholder="Введите заголовок" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Tabs defaultValue="link">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="link">Ссылка</TabsTrigger>
                <TabsTrigger value="file">Файл</TabsTrigger>
              </TabsList>
              <TabsContent value="link">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input label="Ссылка" placeholder={placeholderLoading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value="file">
                <FormField
                  control={form.control}
                  name="resource"
                  render={({ field: { onChange }, ...field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          label="Файл"
                          type="file"
                          {...field}
                          onChange={(event) => {
                            if (event.target.files) {
                              onChange(event.target.files[0]);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
            <div className="col-span-2 mt-4 flex items-center justify-start gap-2">
              <Button type="submit" disabled={updateLesson.isPending}>
                {updateLesson.isPending && <Spinner />}
                Сохранить
              </Button>
              <Button onClick={handleClose} variant="secondary">
                Отменить
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </Modal>
  );
};
