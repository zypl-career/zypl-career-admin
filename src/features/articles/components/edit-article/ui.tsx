import { zodResolver } from '@hookform/resolvers/zod';
import { setFieldError } from '@libs';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { FC } from 'react';
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
  removeEditorContent,
  Spinner,
  Textarea,
  toast,
} from '@ui';
import { useArticleId } from '../../services';
import { UpdateArticleSchema } from './schema';
import { useArticleUpdateById } from './services';
import { TUpdateArticleId } from './types';

export const UpdateArticle: FC = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { data: updateData } = useArticleId(id);
  const form = useForm<TUpdateArticleId>({
    resolver: zodResolver(UpdateArticleSchema),
    values: {
      title: '',
      description: '',
      hashtags: [],
      image: updateData?.image,
      generalInfo: '', // Fix: Change the type to string
      ...updateData,
      minutesRead: updateData?.minutesRead?.toString() || '',
    },
    mode: 'all',
  });

  const preview = form.watch('image');

  const updateArticle = useArticleUpdateById(id);

  const onSubmit = (data: TUpdateArticleId) => {
    updateArticle.mutate(data, {
      onError() {
        setFieldError(form);
      },
      onSuccess() {
        form.reset();
        removeEditorContent();
        navigate('/articles');
        toast({ title: 'Статья успешно обновлена' });
      },
    });
  };

  return (
    <section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="container max-w-5xl"
        >
          <h1 className="mb-6 text-4xl font-bold">Редактировать статью</h1>
          <header className="mb-20 flex items-center gap-32 rounded-md bg-white px-20 py-24">
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
                render={({ field }) => (
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
                name="hashtags"
                render={({ field }) => (
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
                      <DropFile preview={String(preview)} onChange={onChange} />
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
            render={({ field }) =>
              field.value ? (
                <FormItem>
                  <BlockNote value={field.value} onChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              ) : (
                <FormItem />
              )
            }
          />
          <Button
            type="submit"
            className="fixed right-5 top-40"
            disabled={updateArticle.isPending}
          >
            {updateArticle.isPending && <Spinner />}
            Опубликовать статью
          </Button>
        </form>
      </Form>
    </section>
  );
};
