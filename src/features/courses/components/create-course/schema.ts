import { z } from "zod";

export const CreateCourseSchema = z.object({
  title: z.string().min(3, "Минимальная длина 3 символа!"),
  image: z.custom<File>((val) => val instanceof File, "Required").optional(),
  description: z.string(),
  tags: z.string(),
  finishedPercentage: z
    .number({
      description: "Обязательное поле",
    })
    .max(100, "Максимальное допустимое значение 100!"),
});
