import { MAX_FILE_SIZE_MB } from '@constants';
import { toMb } from '@libs';
import { z } from 'zod';

export const CreateLessonIdSchema = z.object({
  name: z.string(),
  resource: z
    .any()
    .refine(
      (file: File) => toMb(file?.size) <= MAX_FILE_SIZE_MB,
      'Max image size is 50MB.',
    ),
  description: z.string(),
});
