import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Button,
  Spinner,
  toast,
  Modal,
  DropFile,
} from "@ui";
import { setFieldError } from "@libs";
import { TCreatePartnerProps } from "./types";
import { UpdatePartnerSchema, TUpdatePartner } from "./schema";
import { useUpdatePartner } from "./services";

export const UpdatePartner: FC<TCreatePartnerProps> = ({ data, open, toggle }) => {
  const form = useForm<TUpdatePartner>({
    resolver: zodResolver(UpdatePartnerSchema),
    values: {
      image: data.image
    },
  });

  const createPartner = useUpdatePartner(data?.id ?? '');  

  const handleClose = () => toggle(false);

  const onSubmit = (data: TUpdatePartner) => {
    createPartner.mutate(data, {
      onError(error) {
        console.error("Ошибка при создании партнера:", error);
        setFieldError(form);
      },
      onSuccess() {
        toast({ title: "Партнёр успешно добавлен" });
        handleClose();
      },
    });
  };

  return (
    <Modal setToggle={toggle} toggle={open}>
      <h1 className="text-4xl font-bold">Добавить партнёра</h1>
      <main className="bg-white rounded flex flex-col gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DropFile preview={field.value} onChange={field.onChange} />
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
