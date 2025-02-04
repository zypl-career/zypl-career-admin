import { zodResolver } from '@hookform/resolvers/zod';
import { setFieldError } from '@libs';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  BlockNote,
  Button,
  DropFile,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  InputTags,
  MultiSelect,
  removeEditorContent,
  SelectField,
  Spinner,
  Textarea,
  toast,
} from '@ui';
import { typesArticle, variantSection } from './constants';
import { CreateArticleSchema } from './schema';
import { useCreateArticle } from './services';
import { TCreateArticle } from './types';

export const WriteArticle = () => {
  const navigate = useNavigate();
  const form = useForm<TCreateArticle>({
    resolver: zodResolver(CreateArticleSchema),
    defaultValues: {
      title: '',
      type: '',
      description: '',
      sections: [],
      hashtags: [],
      image: undefined,
      minutesRead: '', // Fix: Change the type to string
      generalInfo: '', // Fix: Change the type to string
    },
    mode: 'onSubmit',
  });

  const createArticle = useCreateArticle();

  const onSubmit = (data: TCreateArticle) => {
    const hashtags = Array.isArray(data.hashtags) ? data.hashtags.join(', ') : data.hashtags;
    createArticle.mutate(
      { ...data, hashtags },
      {
        onError() {
          setFieldError(form);
        },
        onSuccess() {
          form.reset();
          removeEditorContent();
          navigate('/articles');
          toast({ title: 'Статья успешно создана' });
        },
      },
    );
  };

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="container max-w-5xl">
          <h1 className="mb-6 text-4xl font-bold">Добавить статью</h1>
          <header className="mb-20 flex items-center gap-32 rounded-md bg-white px-20 py-24">
            <div className="flex flex-1 flex-col gap-4">
              <FormField
                control={form.control}
                name="minutesRead"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="w-40" variant="ghost" type="number" placeholder="12 минут чтения" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input variant="ghost" className="text-2xl" placeholder="Введите заголовок" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="generalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="Что-то общее" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <SelectField
                        options={typesArticle}
                        value={field.value}
                        valueType="value"
                        printType="label"
                        placeholder="Выберите тип"
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sections"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <MultiSelect
                        options={variantSection}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        placeholder="Выберите раздел"
                        variant="inverted"
                        animation={2}
                        maxCount={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hashtags"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputTags label="Теги" placeholder="Выберите теги" {...field} />
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
            render={({ field }) => (
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
  );
};
