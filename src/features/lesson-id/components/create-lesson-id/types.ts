import { z } from 'zod';
import { CreateLessonIdSchema } from './schema';

export type TCreateLessonId = z.infer<typeof CreateLessonIdSchema>;

export type TCreateLessonIdResponse = {
  message: string;
  payload: Payload;
};

export type Payload = {
  id: string
  name: string
  description: string
  resource: string
  courseId: string
  status: string
  createdAt: string
  updatedAt: string
  deletedAt: string;
}

export type TCreateLessonProps = {
  open: boolean;
  setOpen: (state: boolean) => void;
}
