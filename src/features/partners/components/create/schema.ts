import { z } from "zod";

export const CreatePartnerSchema = z.object({
  image: z.instanceof(File).optional(),
});

export type TCreatePartner = z.infer<typeof CreatePartnerSchema>;
