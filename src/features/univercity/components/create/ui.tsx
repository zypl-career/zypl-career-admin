import { cities } from '@constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { setFieldError } from '@libs';
import { useForm } from 'react-hook-form';
import { FC } from 'react';
import {
  Button,
  Combobox,
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
import { CreateUniversitySchema, TCreateUniversity } from './schema';
import { useCreateUniversity } from './services.ts';
import { TCreateUniversityProps } from './types';

export const CreateUniversity: FC<TCreateUniversityProps> = ({
  open,
  toggle,
}) => {
  const form = useForm<TCreateUniversity>({
    resolver: zodResolver(CreateUniversitySchema),
    defaultValues: {
      name: '',
      city: '',
      generalInfo: undefined,
    },
  });

  const createUniversity = useCreateUniversity();

  const handleClose = () => toggle(false);

  const onSubmit = (data: TCreateUniversity) => {
    createUniversity.mutate(data, {
      onError() {
        setFieldError(form);
      },
      onSuccess() {
        toast({ title: 'Университет успешно добавлен' });
        handleClose();
      },
    });
  };

  return (
    <Modal setToggle={toggle} toggle={open}>
      <h1 className="text-4xl font-bold">Добавить университет</h1>
      <main className="flex flex-col gap-6 rounded bg-white">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <label htmlFor="name" className="text-sm font-medium">
                    Название университета
                  </label>
                  <FormControl>
                    <Input
                      id="name"
                      {...field}
                      type="text"
                      placeholder="Введите название"
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
                  <label htmlFor="city" className="text-sm font-medium">
                    Город
                  </label>
                  <FormControl>
                    <Combobox
                      value={field.value}
                      onChange={field.onChange}
                      onSelect={({ value }) => field.onChange(value)}
                      filteredData={cities}
                      labelField="label"
                      valueField="value"
                      placeholder="Введите город"
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
                      id="generalInfo"
                      label="Общая информация"
                      {...field}
                      type="text"
                      placeholder="Введите название"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-2 mt-4 flex items-center justify-start gap-2">
              <Button type="submit" disabled={createUniversity.isPending}>
                {createUniversity.isPending && <Spinner />}
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
