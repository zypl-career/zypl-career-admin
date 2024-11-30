import { zodResolver } from '@hookform/resolvers/zod';
import { setFieldError } from '@libs';
import { useForm } from 'react-hook-form';
import { FC } from 'react';
import { Button, DropFile, Form, FormControl, FormField, FormItem, FormMessage, Modal, Spinner, toast } from '@ui';
import { CreatePartnerSchema, TCreatePartner } from './schema';
import { useCreatePartner } from './services';
import { TCreatePartnerProps } from './types';

export const CreatePartner: FC<TCreatePartnerProps> = ({ open, toggle }) => {
  const form = useForm<TCreatePartner>({
    resolver: zodResolver(CreatePartnerSchema),
    defaultValues: {
      image: undefined,
    },
  });

  const createPartner = useCreatePartner();

  const handleClose = () => toggle(false);

  const onSubmit = (data: TCreatePartner) => {
    createPartner.mutate(data, {
      onError() {
        setFieldError(form);
      },
      onSuccess() {
        toast({ title: 'Партнёр успешно добавлен' });
        handleClose();
      },
    });
  };

  return (
    <Modal setToggle={toggle} toggle={open}>
      <h1 className="text-4xl font-bold">Добавить партнёра</h1>
      <main className="flex flex-col gap-6 rounded bg-white">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              <Button type="submit" disabled={createPartner.isPending}>
                {createPartner.isPending && <Spinner />}
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
