import {z} from "zod";

export const CreateLessonIdSchema = z.object({
  name: z.string(),
  resource: z
    .custom<File>((val) => val instanceof File, "Required"),
  description: z.string(),
});
