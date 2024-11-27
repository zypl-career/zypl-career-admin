import { z } from "zod";
import { CreateArticleSchema } from "./schema";

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
