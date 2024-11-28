import { z } from 'zod';

export const CreateUniversitySchema = z.object({
  name: z.string({ required_error: 'Название университета обязательно' }),
  city: z.string({ required_error: 'Город обязателен' }),
  generalInfo: z.string({ required_error: 'Общая информация обязательна' }),
});

export type TCreateUniversity = z.infer<typeof CreateUniversitySchema>;
