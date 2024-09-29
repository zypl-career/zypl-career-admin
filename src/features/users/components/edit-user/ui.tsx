import { Dialog, DialogContent, Form, FormControl, FormField, FormItem, FormMessage, Input } from '@ui'
import { FC } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserSchema } from './schema';
import { TEditUserProps, TUserSchema } from './types';
import { useEditUser } from './services';

export const EditUser: FC<TEditUserProps> = ({ editable, toggle, setToggle }) => {
  const form = useForm<Partial<TUserSchema>>({
    resolver: zodResolver(UserSchema),
    values: {
      ...editable
    },
  });

  const edit = useEditUser(editable?.id || 0);

  const onSubmit = (data: Partial<TUserSchema>) => {
    edit.mutate(data);
    setToggle(false);
  }

  return (
    <Dialog open={toggle} onOpenChange={setToggle}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      label="Имя*"
                      placeholder="Введите имя"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      label="Фамилия*"
                      placeholder="Введите фамилию"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      label="Email*"
                      type="email"
                      placeholder="Введите почту"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      label="Возраст*"
                      type="number"
                      placeholder="Введите возраст"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      label="Округ*"
                      placeholder="Введите округ"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
