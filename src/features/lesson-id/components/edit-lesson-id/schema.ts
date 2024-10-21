import {z} from "zod";

export const UpdateLessonIdSchema = z.object({
  name: z.string(),
  resource: z
    .custom<File>((val) => val instanceof File, "Required").optional(),
  description: z.string(),
});
