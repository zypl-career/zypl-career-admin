import { z } from 'zod';

export const CreateLessonIdSchema = z.object({
  name: z.string(),
  resource: z.any().optional(),
  description: z.string(),
});
