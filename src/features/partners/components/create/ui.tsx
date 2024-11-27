import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Button,
  Spinner,
  toast,
  Modal,
} from "@ui";
import { setFieldError } from "@libs";
import { TCreatePartnerProps } from "./types";
import { CreatePartnerSchema, TCreatePartner } from "./schema";
import { useCreatePartner } from "./services";

export const CreatePartner: FC<TCreatePartnerProps> = ({ open, toggle }) => {
  const form = useForm<TCreatePartner>({
    resolver: zodResolver(CreatePartnerSchema),
    defaultValues: {
      image: undefined
    },
  });

  const createPartner = useCreatePartner();  

  const handleClose = () => toggle(false);

  const onSubmit = (data: TCreatePartner) => {
    console.log("Отправляемые данные:", data);

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
