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
import { TCreateEducationCenterProps } from "./types";
import { CreateEducationCenterSchema, TCreateEducationCenter } from "./schema";
import { useCreateEducationCenter } from "./services";

export const CreateEducationCenter: FC<TCreateEducationCenterProps> = ({
  open,
  toggle,
}) => {
  const form = useForm<TCreateEducationCenter>({
    resolver: zodResolver(CreateEducationCenterSchema),
    defaultValues: {
      title: "",
      image: undefined,
      generalInfo: "",
      city: "",
    },
  });

  const createEducationCenter = useCreateEducationCenter();

  const handleClose = () => toggle(false);

  const onSubmit = (data: TCreateEducationCenter) => {
    createEducationCenter.mutate(data, {
      onError(error) {
        console.error("Ошибка при создании образовательного центра:", error);
        setFieldError(form);
      },
      onSuccess() {
        toast({ title: "Образовательный центр успешно добавлен" });
        handleClose();
      },
    });
  };

  return (
    <Modal setToggle={toggle} toggle={open}>
      <h1 className="text-4xl font-bold">Добавить образовательный центр</h1>
      <main className="bg-white rounded flex flex-col gap-6">
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
