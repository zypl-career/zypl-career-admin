import { z } from 'zod';
import { UpdateArticleSchema } from './schema';
import { TArticleData } from '@entities';

export type TUpdateArticleId = z.infer<typeof UpdateArticleSchema>;

export type TUpdateArticleIdResponse = {
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

export type TUpdateArticleProps = {
  open: boolean;
  setOpen: (state: boolean) => void;
  data?: Partial<TArticleData>;
};
