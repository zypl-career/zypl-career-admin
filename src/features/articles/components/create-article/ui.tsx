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
  toast,
  Modal,
  InputTags,
} from "@ui";
import {setFieldError} from "@libs";
import {TCreateArticle, TCreateArticleProps} from "./types";
import {CreateArticleSchema} from "./schema";
import {useCreateArticle} from "./services";
import {useNavigate} from "react-router-dom";
import { FC } from "react";

export const CreateArticle: FC<TCreateArticleProps> = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const form = useForm<TCreateArticle>({
    resolver: zodResolver(CreateArticleSchema),
    defaultValues: {
      title: "",
      description: "",
      hashtags: [],
      image: undefined,
      minutesRead: "0", // Fix: Change the type to string
      generalInfo: "", // Fix: Change the type to string
    },
  });

  const createArticle = useCreateArticle();

  const onSubmit = (data: TCreateArticle) => {
    const hashtags = Array.isArray(data.hashtags) ? data.hashtags.join(', ') : data.hashtags;
    createArticle.mutate({ ...data, hashtags }, {
      onError() {
        setFieldError(form);
      },
      onSuccess() {
        toast({ title: "Статья успешно создана" });
        setOpen(false);
      }
    });
  };

  return (
    <Modal setToggle={setOpen} toggle={open}>
      <h1 className="text-4xl font-bold mb-6">Добавить статью</h1>
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
              <Button type="submit" disabled={createArticle.isPending}>
                {createArticle.isPending && <Spinner />}
                Сохранить
              </Button>
              <Button onClick={() => navigate("/courses")} variant="secondary">
                Отменить
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </Modal>
  );
};
