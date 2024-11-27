import { zodResolver } from '@hookform/resolvers/zod';
import { setFieldError } from '@libs';
import { useForm } from 'react-hook-form';
import { FC } from 'react';
import {
  Button,
  DropFile,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Modal,
  Spinner,
  toast,
} from '@ui';
import { CreateEducationCenterSchema, TCreateEducationCenter } from './schema';
import { useCreateEducationCenter } from './services';
import { TCreateEducationCenterProps } from './types';

export const CreateEducationCenter: FC<TCreateEducationCenterProps> = ({
  open,
  toggle,
}) => {
  const form = useForm<TCreateEducationCenter>({
    resolver: zodResolver(CreateEducationCenterSchema),
    defaultValues: {
      title: '',
      image: undefined,
      generalInfo: '',
      city: '',
    },
  });

  const createEducationCenter = useCreateEducationCenter();

  const handleClose = () => toggle(false);

  const onSubmit = (data: TCreateEducationCenter) => {
    createEducationCenter.mutate(data, {
      onError() {
        setFieldError(form);
      },
      onSuccess() {
        toast({ title: 'Образовательный центр успешно добавлен' });
        handleClose();
      },
    });
  };

  return (
    <Modal setToggle={toggle} toggle={open}>
      <h1 className="text-4xl font-bold">Добавить образовательный центр</h1>
      <main className="flex flex-col gap-6 rounded bg-white">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      label="Название"
                      placeholder="Введите название"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      label="Город"
                      placeholder="Введите город"
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
                    <Input
                      label="Общая информация"
                      placeholder="Введите описание"
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
              render={({ field: { onChange } }) => (
                <FormItem>
                  <FormControl>
                    <DropFile onChange={onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-2 mt-4 flex items-center justify-start gap-2">
              <Button type="submit" disabled={createEducationCenter.isPending}>
                {createEducationCenter.isPending && <Spinner />}
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
