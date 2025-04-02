import * as z from 'zod';

export const CreateSpecialtySchema = z.object({
  name: z.string().min(1, { message: 'Обязательное поле' }),
  EIOHPE: z.string().min(1, { message: 'Обязательное поле' }),
  class: z.string().transform((val) => Number(val)),
  specializationGroup: z.string().transform((val) => Number(val)),
  clusterName: z.string().min(1, { message: 'Обязательное поле' }),
  clusterTag: z.string().min(1, { message: 'Обязательное поле' }),
  specialtyDescription: z.string().min(1, { message: 'Обязательное поле' }),
  specialtyCode: z.string().transform((val) => Number(val)),
  specialtyName: z.string().min(1, { message: 'Обязательное поле' }),
  formOfEducation: z.string().min(1, { message: 'Обязательное поле' }),
  typeOfStudy: z.string().min(1, { message: 'Обязательное поле' }),
  languageOfStudy: z.string().min(1, { message: 'Обязательное поле' }),
  universityName: z.string().min(1, { message: 'Обязательное поле' }),
  monthlyIncome: z.string().transform((val) => Number(val)),
  skillsLevel: z.string().transform((val) => Number(val)),
  futureGrowth: z.string().min(1, { message: 'Обязательное поле' }),
  overview: z.string().min(1, { message: 'Обязательное поле' }),
  careerOpportunities: z.string().min(1, { message: 'Обязательное поле' }).array(),
});

export type TCreateSpecialty = z.infer<typeof CreateSpecialtySchema>;
