import { z } from 'zod';

export const VideoGuideSchema = z.object({
  title: z.string(),
  image: z.instanceof(File).optional(),
  generalInfo: z.string(),
});
