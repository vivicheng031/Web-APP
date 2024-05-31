import { z } from "zod";

export const postSchema = z.object({
  image: z.string(),
  description: z.string(),
  topicId: z.string(),
});

export const bookSchema = z.object({
  topic: z.string(),
});
