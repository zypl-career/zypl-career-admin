import { z } from 'zod';
import { CreateArticleSchema } from './schema';

export type TArticleSection =
  | 'Partners'
  | 'Universities and Colleges'
  | 'Professions'
  | 'Industries'
  | 'Educational Centers'
  | 'Courses'
  | 'Career Articles'
  | 'Resources for Job Seekers'
  | 'User Guide Videos'
  | 'Articles for Parents'
  | 'Articles for Teachers and Practitioners'
  | 'Articles for Homepage';

export type TArticleType = 'student' | 'teacher' | 'parent' | 'admin';

export type TCreateArticle = z.infer<typeof CreateArticleSchema>;

export type TCreateArticleResponse = {
  message: string;
  payload: Payload;
};

export type Payload = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  finishedPercentage: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type TCreateArticleProps = {
  open: boolean;
  setOpen: (state: boolean) => void;
};
