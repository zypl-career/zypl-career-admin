import { z } from 'zod';

export const CreateUniversitySchema = z.object({
  name: z.string().nonempty('Название университета обязательно'),
  city: z.string().nonempty('Город обязателен'),
  generalInfo: z.instanceof(File).optional(),
});

export type TCreateUniversity = z.infer<typeof CreateUniversitySchema>;
