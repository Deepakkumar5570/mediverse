import { z } from "zod";

export const createSubtopicSchema = z.object({
  topicId: z.uuid(),

  title: z.string().min(2).max(200),

  slug: z.string().min(2).max(220),

  subtopicNumber: z.number().int().positive(),

  description: z.string().optional(),

  status: z.enum([
    "active",
    "inactive",
  ]),
});

export type CreateSubtopicInput =
  z.infer<typeof createSubtopicSchema>;