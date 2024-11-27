import { z } from "zod";

export const UpdateCourseSchema = z.object({
  title: z.string(),
  image: z.custom<File | null>((val) => val instanceof File, "Required"),
  description: z.string(),
  tags: z.string(),
  finishedPercentage: z
    .string()
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    }),
});
