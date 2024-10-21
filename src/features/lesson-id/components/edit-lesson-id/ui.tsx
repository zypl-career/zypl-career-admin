import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
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
  toast, Modal,
} from "@ui";
import {setFieldError} from "@libs";
import {TUpdateLessonId, TUpdateLessonProps} from "./types";
import {UpdateLessonIdSchema} from "./schema";
import {useLessonUpdateById} from "./services";
import { useParams } from "react-router-dom";
import {FC, useMemo} from "react";
import {useLessonById} from "@/features/lesson-id/services.ts";

export const UpdateLesson: FC<TUpdateLessonProps> = ({ data, open, setOpen }) => {
  const { id = '' } = useParams()
  const { data: lessonData, isLoading: lessonLoading } = useLessonById(data?.id || '')
  const form = useForm<TUpdateLessonId>({
    resolver: zodResolver(UpdateLessonIdSchema),
    values: {
      description: ``,
      resource: undefined,
      name: "",
      ...data,
      ...lessonData
    },
    mode: 'all'
  });

  const placeholderLoading = useMemo(() => (lessonLoading) ? 'Подгружаем данные ...' : '', [lessonLoading])

  const updateLesson = useLessonUpdateById(id, data?.id || '');
  const handleClose = () => setOpen(false)

  const onSubmit = (data: TUpdateLessonId) => {
    updateLesson.mutate(data, {
      onError() {
        setFieldError(form);
      },
      onSuccess() {
        toast({ title: "Урок успешно обновлен" });
        handleClose()
      }
    });
  };

  return (
    <Modal setToggle={setOpen} toggle={open}>
      <h1 className="text-4xl font-bold">Изменить урок</h1>
      <main className="bg-white rounded flex flex-col gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
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
              name="description"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Описание</FormLabel>
                  <Editor {...field} placeholder={placeholderLoading} />
                  <FormMessage />
                </FormItem>
              )}
            />
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
