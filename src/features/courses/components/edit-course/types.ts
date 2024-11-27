import { z } from "zod";
import { UpdateCourseSchema } from "./schema";

export type TUpdateCourse = z.infer<typeof UpdateCourseSchema>;

export type TUpdateCourseResponse = {
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
