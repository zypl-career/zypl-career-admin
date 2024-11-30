import { zodResolver } from '@hookform/resolvers/zod';
import { setFieldError } from '@libs';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { FC } from 'react';
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
import { CreateLessonIdSchema } from './schema';
import { useLessonIdCourse } from './services';
import { TCreateLessonId, TCreateLessonProps } from './types';

export const CreateLesson: FC<TCreateLessonProps> = ({ open, setOpen }) => {
  const { id = '' } = useParams();
  const form = useForm<TCreateLessonId>({
    resolver: zodResolver(CreateLessonIdSchema),
    defaultValues: {
      name: '',
      description: '',
      resource: '',
    },
  });

  const createLesson = useLessonIdCourse(id);

  const handleClose = () => {
    setOpen(false);
    form.reset();
  };

  const onSubmit = (data: TCreateLessonId) => {
    createLesson.mutate(data, {
      onError() {
        setFieldError(form);
      },
      onSuccess() {
        toast({ title: 'Урок успешно создан' });
        handleClose();
      },
    });
  };

  return (
    <Modal setToggle={setOpen} toggle={open}>
      <h1 className="text-4xl font-bold">Добавить урок</h1>
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
                        <Input label="Ссылка" placeholder="https://example.com" {...field} />
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
              <Button type="submit" disabled={createLesson.isPending}>
                {createLesson.isPending && <Spinner />}
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
