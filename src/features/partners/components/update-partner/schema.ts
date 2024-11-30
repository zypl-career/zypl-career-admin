import { z } from 'zod';

export const UpdatePartnerSchema = z.object({
  image: z
    .custom<File | string>((val) => val instanceof File || typeof val === 'string', 'Required')
    .optional()
    .nullable(),
});

export type TUpdatePartner = z.infer<typeof UpdatePartnerSchema>;
