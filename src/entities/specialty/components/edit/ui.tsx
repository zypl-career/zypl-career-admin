import { zodResolver } from '@hookform/resolvers/zod';
import { setFieldError } from '@libs';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { FC } from 'react';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  InputTags,
  Modal,
  Spinner,
  Textarea,
  toast,
} from '@ui';
import { CreateSpecialtySchema, TCreateSpecialty } from './schema';
import { useUpdateSpecialty } from './services';
import { TUpdateSpecialtyProps } from './types';

export const UpdateSpecialty: FC<TUpdateSpecialtyProps> = ({ data, open, toggle }) => {
  const id = useParams<{ id: string }>().id;
  const form = useForm<TCreateSpecialty>({
    resolver: zodResolver(CreateSpecialtySchema),
    values: {
      name: data?.name || '',
      EIOHPE: data?.EIOHPE || '',
      class: data?.class || 0,
      specializationGroup: data?.specializationGroup || 0,
      clusterName: data?.clusterName || '',
      clusterTag: data?.clusterTag || '',
      specialtyDescription: data?.specialtyDescription || '',
      specialtyCode: data?.specialtyCode || 0,
      specialtyName: data?.specialtyName || '',
      formOfEducation: data?.formOfEducation || '',
      typeOfStudy: data?.typeOfStudy || '',
      languageOfStudy: data?.languageOfStudy || '',
      universityName: data?.universityName || '',
      monthlyIncome: data?.monthlyIncome || 0,
      skillsLevel: data?.skillsLevel || 0,
      futureGrowth: data?.futureGrowth || '',
      overview: data?.overview || '',
      careerOpportunities: data?.careerOpportunities || [],
    },
  });

  const createSpecialty = useUpdateSpecialty(String(id));

  const handleClose = () => toggle(false);

  const onSubmit = (data: TCreateSpecialty) => {
    createSpecialty.mutate(data, {
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
                    <Input label="Название" placeholder="Computer Science" {...field} />
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
                    <Input label="EIOHPE" placeholder="EIOHPE123" {...field} />
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
                    <Input label="Класс" placeholder="3" type="number" {...field} />
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
                    <Input label="Группы специализация" placeholder="2" type="number" {...field} />
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
                    <Input label="Название кластера" placeholder="Engineering" {...field} />
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
                    <Input label="Тег кластера" placeholder="ENG" {...field} />
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
                  <FormLabel>Описание специальности</FormLabel>
                  <FormControl>
                    <Textarea placeholder="A specialization in computer science" {...field} />
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
                    <Input label="Код специальности" placeholder="101" {...field} />
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
                    <Input
                      label="Имя специальности"
                      placeholder="Bachelor of Computer Science"
                      {...field}
                    />
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
                    <Input label="Форма обучения" placeholder="Full-time" {...field} />
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
                    <Input label="Тип обучения" placeholder="On-campus" {...field} />
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
                    <Input label="Язык обучения" placeholder="English" {...field} />
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
                    <Input label="Название университета" placeholder="XYZ University" {...field} />
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
                    <Input label="Месячный доход" placeholder="1000" type="number" {...field} />
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
                    <Input label="Уровень навыков" placeholder="5" type="number" {...field} />
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
                    <Input label="Перспективы роста" placeholder="High" {...field} />
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
                    <Input label="Обзор" placeholder="An overview of the specialty" {...field} />
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
                  <FormLabel>Возможности карьеры (через запятую)</FormLabel>
                  <FormControl>
                    <InputTags placeholder="Software Development, Data Analysis" {...field} />
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
