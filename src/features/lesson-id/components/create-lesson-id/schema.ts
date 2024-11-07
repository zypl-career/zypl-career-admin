import { z } from "zod";
import { MAX_FILE_SIZE } from "@constants";

export const CreateLessonIdSchema = z.object({
  name: z.string(),
  resource: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`),
  description: z.string(),
});
