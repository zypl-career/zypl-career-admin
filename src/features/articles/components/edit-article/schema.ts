import {z} from "zod";

export const UpdateArticleSchema = z.object({
  title: z.string(),
  image: z.custom<File | string>((val) => val instanceof File || typeof val === 'string', "Required").optional(),
  description: z.string(),
  minutesRead: z.number({
    description: 'Обязательное поле'
  })
  .max(100, 'Максимальное допустимое значение 100!'),
  generalInfo: z.string(),
  hashtags: z
    .custom<string[] | string>(
      (val) => Array.isArray(val) || typeof val === "string",
      "Expected array, received a string"
    )
});
