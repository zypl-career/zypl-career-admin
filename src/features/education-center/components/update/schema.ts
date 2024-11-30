import { z } from 'zod';

export const UpdateEducationCenterSchema = z.object({
  title: z.string().min(1, 'Название обязательно'),
  city: z.string().min(1, 'Город обязателен'),
  generalInfo: z.string().optional(),
  image: z.custom<File | string>((val) => val instanceof File || typeof val === 'string', 'Required'),
});

export type TUpdateEducationCenter = z.infer<typeof UpdateEducationCenterSchema>;
