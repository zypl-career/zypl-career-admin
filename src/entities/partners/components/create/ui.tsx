import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Button,
  Spinner,
  toast,
  Modal,
} from "@ui";
import { setFieldError } from "@libs";
import { TCreatePartner, TCreatePartnerProps } from "./types";
import { CreatePartnerSchema } from "./schema";
import { useCreatePartner } from "./services";

export const CreatePartner: FC<TCreatePartnerProps> = ({ open, setOpen }) => {
  const form = useForm<TCreatePartner>({
    resolver: zodResolver(CreatePartnerSchema),
    defaultValues: {
      name: "",
      image: undefined,
      createdAt: new Date().toISOString(),
    },
  });

  const createPartner = useCreatePartner();  

  const handleClose = () => setOpen(false);

  const onSubmit = (data: TCreatePartner) => {
    console.log("Отправляемые данные:", data);

    createPartner.mutate(data, {
      onError(error: any) {
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
    <Modal setToggle={setOpen} toggle={open}>
      <h1 className="text-4xl font-bold">Добавить партнёра</h1>
      <main className="bg-white rounded flex flex-col gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      label="Название"
                      placeholder="Введите название партнёра"
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
                          onChange(event.target.files[0]);
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
              name="createdAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Дата создания</FormLabel>
                  <Input
                    type="datetime-local"
                    {...field}
                    value={field.value}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-2 mt-4 flex items-center justify-start gap-2">
              <Button type="submit" disabled={createPartner.isLoading}>
                {createPartner.isLoading && <Spinner />}
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
