import { zodResolver } from '@hookform/resolvers/zod';
import { setFieldError } from '@libs';
import { useForm } from 'react-hook-form';
import { FC } from 'react';
import { Button, Form, FormControl, FormField, FormItem, FormMessage, Input, Modal, Spinner, toast } from '@ui';
import { CreateSpecialtySchema, TCreateSpecialty } from './schema';
import { useCreateSpecialty } from './services';
import { TCreateSpecialtyProps } from './types';

export const CreateSpecialty: FC<TCreateSpecialtyProps> = ({ open, toggle }) => {
  const form = useForm<TCreateSpecialty>({
    resolver: zodResolver(CreateSpecialtySchema),
    defaultValues: {
      name: '',
      EIOHPE: '',
      class: 0,
      specializationGroup: 0,
      clusterName: '',
      clusterTag: '',
      specialtyDescription: '',
      specialtyCode: '',
      specialtyName: '',
      formOfEducation: '',
      typeOfStudy: '',
      languageOfStudy: '',
      universityName: '',
      monthlyIncome: 0,
      skillsLevel: 0,
      futureGrowth: '',
      overview: '',
      careerOpportunities: '',
    },
  });

  const createSpecialty = useCreateSpecialty();

  const handleClose = () => toggle(false);

  const onSubmit = (data: TCreateSpecialty) => {
    const transformedData = {
      ...data,
      class: Number(data.class),
      specializationGroup: Number(data.specializationGroup),
      monthlyIncome: Number(data.monthlyIncome),
      skillsLevel: Number(data.skillsLevel),
    };

    createSpecialty.mutate(transformedData, {
      onError() {
        setFieldError(form);
      },
      onSuccess() {
        toast({ title: 'Специальность успешно добавлена' });
        handleClose();
      },
    });
  };

  return (
    <Modal setToggle={toggle} toggle={open}>
      <h1 className="text-4xl font-bold">Добавить специальность</h1>
      <main className="flex flex-col gap-6 rounded bg-white">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Название" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="EIOHPE"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="EIOHPE" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="class"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Класс" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specializationGroup"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Группа специализации" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="clusterName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Название кластера" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="clusterTag"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Тег кластера" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specialtyDescription"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Описание специальности" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specialtyCode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Код специальности" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specialtyName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Имя специальности" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="formOfEducation"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Форма обучения" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="typeOfStudy"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Тип обучения" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="languageOfStudy"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Язык обучения" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="universityName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Название университета" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="monthlyIncome"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Месячный доход" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="skillsLevel"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Уровень навыков" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="futureGrowth"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Перспективы роста" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="overview"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Обзор" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="careerOpportunities"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Возможности карьеры (через запятую)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-2 mt-4 flex items-center justify-start gap-2">
              <Button type="submit" disabled={createSpecialty.isPending}>
                {createSpecialty.isPending && <Spinner />}
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
