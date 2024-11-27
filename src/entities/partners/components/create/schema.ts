import { z } from "zod";

export const CreatePartnerSchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  image: z.instanceof(File).optional(),
  createdAt: z.string().optional(),
});

export type TCreatePartner = z.infer<typeof CreatePartnerSchema>;
