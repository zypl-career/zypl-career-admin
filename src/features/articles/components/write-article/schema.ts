import { z } from 'zod';
import { sections } from './constants';

export const CreateArticleSchema = z.object({
  title: z.string(),
  type: z.string(),
  sections: z.array(z.enum(sections)),
  image: z.custom<File>((val) => val instanceof File, 'Required'),
  description: z.string(),
  minutesRead: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: 'Expected number, received a string',
  }),
  generalInfo: z.string(),
  hashtags: z.custom<string[] | string>(
    (val) => Array.isArray(val) || typeof val === 'string',
    'Expected array, received a string',
  ),
});
