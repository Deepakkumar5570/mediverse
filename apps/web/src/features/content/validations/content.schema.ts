import { z } from "zod";

export const createContentSchema = z.object({
  subtopicId: z.uuid(),

  title: z.string().min(2).max(250),

  slug: z.string().min(2).max(300),

  summary: z.string().optional(),

  content: z.string().min(1),

  readingTime: z.number().int().positive(),

  seoTitle: z.string().optional(),

  seoDescription: z.string().optional(),

  status: z.enum([
    "draft",
    "active",
    "archived",
  ]),
});

export type CreateContentInput =
  z.infer<typeof createContentSchema>;