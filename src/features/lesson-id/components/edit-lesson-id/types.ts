import { z } from 'zod';
import { UpdateLessonIdSchema } from './schema';
import { TLessonIdData } from '@entities';

export type TUpdateLessonId = z.infer<typeof UpdateLessonIdSchema>;

export type TUpdateLessonIdResponse = {
  message: string;
  payload: Payload;
};

export type Payload = {
  id: string;
  name: string;
  description: string;
  resource: string;
  courseId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type TUpdateLessonProps = {
  open: boolean;
  setOpen: (state: boolean) => void;
  data: Partial<TLessonIdData>;
};
