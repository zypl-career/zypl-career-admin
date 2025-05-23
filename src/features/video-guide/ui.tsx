import { TArticleData } from '@entities';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash2Icon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useCallback, useState } from 'react';
import { AsyncText, Button, Form, Spinner, toast } from '@ui';
import { AddVideoGuide, TVideoGuideSchema, useCreateVideoGuide, VideoGuideSchema } from './components';
import { useDeleteVideoGuide, useGetVideoGuide } from './services';

export const VideoGuide = () => {
  const [isShowAdd, setIsShowAdd] = useState(false);
  const form = useForm<TVideoGuideSchema>({
    defaultValues: {
      generalInfo: '',
      title: '',
      description: '',
    },
    resolver: zodResolver(VideoGuideSchema),
    mode: 'onSubmit',
  });

  const createVideoGuide = useCreateVideoGuide();
  const deleteVideoGuide = useDeleteVideoGuide();
  const { data, isLoading } = useGetVideoGuide();

  const deleteHandler = useCallback(
    (id: TArticleData['id']) => {
      deleteVideoGuide.mutate(id);
    },
    [deleteVideoGuide],
  );

  const submitHandler = useCallback(
    (data: TVideoGuideSchema) => {
      createVideoGuide.mutate(data, {
        onSuccess() {
          toast({ title: 'Видео успешно добавлено' });
          setIsShowAdd(false);
          form.reset();
        },
      });
    },
    [createVideoGuide, form],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)}>
        <header className="mb-5 flex flex-wrap items-center justify-between">
          <h1 className="text-4xl font-bold">Видео с руководством пользователя</h1>
          <div className="flex items-center gap-4">
            {isShowAdd ? (
              <>
                <Button type="button" onClick={() => setIsShowAdd(false)} variant="secondary">
                  Отменить
                </Button>
                <Button isLoading={createVideoGuide.isPending} type="submit">
                  Сохранить
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsShowAdd(true)} type="button">
                Добавить видео
              </Button>
            )}
          </div>
        </header>
        {isShowAdd ? <AddVideoGuide control={form.control} /> : null}
      </form>
      {isLoading ? (
        <Spinner />
      ) : (
        <main className="flex flex-col gap-5">
          {data?.map((item) => (
            <div key={item.id}>
              <header className="mb-2">
                <h1 className="text-2xl font-bold">{item.title}</h1>
              </header>
              <main className="flex w-full items-center justify-between rounded-lg bg-white p-5 shadow-md">
                <div className="flex-1">
                  <AsyncText file={item.generalInfoFile} />
                </div>
                <aside className="flex items-center gap-5">
                  {item.image.endsWith('.mp4') ? (
                    <video controls>
                      <source src={item.image} type="video/mp4" />
                    </video>
                  ) : (
                    <iframe
                      width={620}
                      height="315"
                      src={item.description}
                      title="YouTube video player"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope;"
                      allowFullScreen
                    />
                  )}
                  <Button
                    variant="ghost"
                    className="hover:text-red-500"
                    disabled={deleteVideoGuide.isPending}
                    onClick={() => deleteHandler(item.id)}
                  >
                    {deleteVideoGuide.isPending ? <Spinner /> : <Trash2Icon />}
                  </Button>
                </aside>
              </main>
            </div>
          ))}
        </main>
      )}
    </Form>
  );
};
