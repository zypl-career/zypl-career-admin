import { z } from 'zod';

export const VideoGuideSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  image: z.instanceof(File).optional(),
  generalInfo: z.string(),
});
