import { zodResolver } from "@hookform/resolvers/zod";
import { BlockNote, Button, DropFile, Form, FormControl, FormField, FormItem, FormMessage, Input, InputTags, Spinner, Textarea, toast } from "@ui"
import { useForm } from "react-hook-form";
import { TCreateArticle } from "./types";
import { CreateArticleSchema } from "./schema";
import { useCreateArticle } from "./services";
import { setFieldError } from "@/shared/libs";

export const WriteArticle = () => {
  const form = useForm<TCreateArticle>({
    resolver: zodResolver(CreateArticleSchema),
    defaultValues: {
      title: "",
      description: "",
      hashtags: [],
      image: undefined,
      minutesRead: "", // Fix: Change the type to string
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
      }
    });
  };

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-5xl container">
          <h1 className="text-4xl font-bold mb-6">Добавить статью</h1>
          <header className="py-24 px-20 bg-white flex items-center gap-32 mb-20 rounded-md">
            <div className="flex flex-1 flex-col gap-4">
              <FormField
                control={form.control}
                name="minutesRead"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="w-40"
                        variant="ghost"
                        type="number"
                        placeholder="12 минут чтения"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        variant="ghost"
                        className="text-2xl"
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
                      <Textarea
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
            </div>
            <div className="flex-1">
              <FormField
                control={form.control}
                name="image"
                render={({ field: { onChange } }) => (
                  <FormItem>
                    <FormControl>
                      {/* <Input
                        label="Изображение"
                        type="file"
                        
                        {...field}
                        onChange={(event) => {
                          if (event.target.files) {
                            onChange(event.target.files[0])
                          }
                        }}
                      /> */}
                    <DropFile onChange={onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </header>
          <FormField
            control={form.control}
            name="description"
            render={({field}) => (
              <FormItem>
                <BlockNote value={field.value} onChange={field.onChange} />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="fixed right-5 top-40" disabled={createArticle.isPending}>
            {createArticle.isPending && <Spinner />}
            Опубликовать статью
          </Button>
        </form>
      </Form>
    </section>
  )
}
