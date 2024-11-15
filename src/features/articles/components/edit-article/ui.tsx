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
  InputTags,
} from "@ui";
import {setFieldError} from "@libs";
import {TUpdateArticleId, TUpdateArticleProps} from "./types";
import { UpdateArticleSchema } from "./schema";
import {useArticleUpdateById} from "./services";
import { FC } from "react";

export const UpdateArticle: FC<TUpdateArticleProps> = ({ data, open, setOpen }) => {
  const form = useForm<TUpdateArticleId>({
    resolver: zodResolver( UpdateArticleSchema ),
    values: {
      title: "",
      description: "",
      minutesRead: 0,
      hashtags: [],
      image: undefined,
      generalInfo: "", // Fix: Change the type to string
      ...data
    },
    mode: 'all'
  });

  const updateArticle = useArticleUpdateById(data?.id || '');
  const handleClose = () => setOpen(false)

  const onSubmit = (data: TUpdateArticleId) => {
    updateArticle.mutate(data, {
      onError() {
        setFieldError(form);
      },
      onSuccess() {
        toast({ title: "Статья успешно обновлена" });
        handleClose()
      }
    });
  };

  return (
    <Modal setToggle={setOpen} toggle={open}>
      <h1 className="text-4xl font-bold">Изменить статью</h1>
      <main className="bg-white rounded flex flex-col gap-6">
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
              name="generalInfo"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input
                      label="Общая информация"
                      placeholder="Что-то общее"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="minutesRead"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input
                      label="готовый процент"
                      placeholder="38%"
                      {...field}
                      onChange={e => field.onChange(+e.target.value)}
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
              name="hashtags"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <InputTags
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
              <Button type="submit" disabled={updateArticle.isPending}>
                {updateArticle.isPending && <Spinner />}
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
