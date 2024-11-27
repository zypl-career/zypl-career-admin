import { z } from "zod";
import { CreateCourseSchema } from "./schema";

export type TCreateCourse = z.infer<typeof CreateCourseSchema>;

export type TCreateCourseResponse = {
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
