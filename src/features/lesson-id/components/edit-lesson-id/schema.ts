import { z } from 'zod';

export const UpdateLessonIdSchema = z.object({
  name: z.string(),
  resource: z
    .custom<File | string>(
      (val) => val instanceof File || typeof val === 'string',
      'Required',
    )
    .optional()
    .nullable(),
  description: z.string(),
});
