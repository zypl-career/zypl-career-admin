import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
} from "@ui";
import { setFieldError } from "@libs";
import { TUpdateCourse } from "./types";
import { UpdateCourseSchema } from "./schema";
import { useCourseById, useEditCourse } from "./services";

export const UpdateCourse = () => {
  const { id = '0' } = useParams();
  const { data: course, isLoading } = useCourseById(id);
  const navigate = useNavigate();

  const form = useForm<TUpdateCourse>({
    resolver: zodResolver(UpdateCourseSchema),
    values: {
      title: course?.title || '',
      image: null,
      description: course?.description || '',
      tags: '',
      finishedPercentage: course?.finishedPercentage?.toLocaleString() || '0',
    },
    mode: 'all'
  });


  const updateCourse = useEditCourse(id);

  const onSubmit = (data: TUpdateCourse) => {
    updateCourse.mutate(data, {
      onError() {
        setFieldError(form);
      },
      onSuccess() {
        toast({ title: 'Успешно', description: 'Курс успешно обнавлен', variant: 'success' });
        navigate('/courses')
      }
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section>
      <h1 className="text-4xl font-bold mb-6">Изменить Курс {course?.title}</h1>
      <main className="bg-white rounded flex flex-col gap-6 p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({field}) => (
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
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      label="готовый процент"
                      placeholder="38%"
                      {...field}
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
                          onChange(event.target.files[0])
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
              render={({field}) => (
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
              render={({field}) => (
                <FormItem>
                  <FormLabel>Описание</FormLabel>
                  <Editor {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-2 mt-4 flex items-center justify-start gap-2">
              <Button type="submit" disabled={updateCourse.isPending}>
                {updateCourse.isPending && <Spinner />}
                Сохранить
              </Button>
              <Button onClick={() => navigate("/courses")} variant="secondary">
                Отменить
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </section>
  );
};
