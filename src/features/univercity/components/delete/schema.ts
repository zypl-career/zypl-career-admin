import { z } from 'zod';

export const DeleteUniversitySchema = z.object({
  id: z.string().uuid('Некорректный идентификатор университета'),
});

export type TDeleteUniversity = z.infer<typeof DeleteUniversitySchema>;
