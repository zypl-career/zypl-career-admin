import { z } from "zod";

export const CreateEducationCenterSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  city: z.string().min(1, "Город обязателен"),
  generalInfo: z.string().optional(),
  image: z.instanceof(File).optional(),
});

export type TCreateEducationCenter = z.infer<
  typeof CreateEducationCenterSchema
>;
