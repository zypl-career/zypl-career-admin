import * as z from 'zod';

export const CreateSpecialtySchema = z.object({
  name: z.string().min(1, { message: 'Обязательное поле' }),
  EIOHPE: z.string().min(1, { message: 'Обязательное поле' }),
  class: z.number().min(1, { message: 'Обязательное поле' }),
  specializationGroup: z.number().min(1, { message: 'Обязательное поле' }),
  clusterName: z.string().min(1, { message: 'Обязательное поле' }),
  clusterTag: z.string().min(1, { message: 'Обязательное поле' }),
  specialtyDescription: z.string().min(1, { message: 'Обязательное поле' }),
  specialtyCode: z.string().min(1, { message: 'Обязательное поле' }),
  specialtyName: z.string().min(1, { message: 'Обязательное поле' }),
  formOfEducation: z.string().min(1, { message: 'Обязательное поле' }),
  typeOfStudy: z.string().min(1, { message: 'Обязательное поле' }),
  languageOfStudy: z.string().min(1, { message: 'Обязательное поле' }),
  universityName: z.string().min(1, { message: 'Обязательное поле' }),
  monthlyIncome: z.number().min(0, { message: 'Обязательное поле' }),
  skillsLevel: z.number().min(0, { message: 'Обязательное поле' }),
  futureGrowth: z.string().min(1, { message: 'Обязательное поле' }),
  overview: z.string().min(1, { message: 'Обязательное поле' }),
  careerOpportunities: z.string().min(1, { message: 'Обязательное поле' }),
});

export type TCreateSpecialty = z.infer<typeof CreateSpecialtySchema>;
