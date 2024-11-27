import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Editor,
  Button,
  Spinner,
  toast,
} from '@ui';
import { setFieldError } from '@libs';
import { TCreateCourse } from './types';
import { CreateCourseSchema } from './schema';
import { useCreateCourse } from './services';
import { useNavigate } from 'react-router-dom';

export const CreateCourse = () => {
  const navigate = useNavigate();
  const form = useForm<TCreateCourse>({
    resolver: zodResolver(CreateCourseSchema),
    defaultValues: {
      title: '',
      description: '',
      tags: '',
      image: undefined,
    },
  });

  const createCourse = useCreateCourse();

  const onSubmit = (data: TCreateCourse) => {
    createCourse.mutate(data, {
      onError() {
        setFieldError(form);
      },
      onSuccess() {
        toast({ title: 'Курс успешно создан' });
        navigate('/courses');
      },
    });
  };

  return (
    <section>
      <h1 className="mb-6 text-4xl font-bold">Добавить Курс</h1>
      <main className="flex flex-col gap-6 rounded bg-white p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      label="Заголовок"
                      placeholder="Введите заголовок"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="finishedPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      label="готовый процент"
                      placeholder="38%"
                      {...field}
                      onChange={(e) => {
                        field.onChange(Number(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field: { onChange }, ...field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      label="Изображение"
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
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      label="Теги"
                      placeholder="Выберите теги"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Описание</FormLabel>
                  <Editor {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-2 mt-4 flex items-center justify-start gap-2">
              <Button type="submit" disabled={createCourse.isPending}>
                {createCourse.isPending && <Spinner />}
                Сохранить
              </Button>
              <Button onClick={() => navigate('/courses')} variant="secondary">
                Отменить
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </section>
  );
};
