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


export const createSubtopicsSchema = z.object({
  topicId: z.uuid(),

  subtopics: z
    .array(
      z.object({
        title: z.string().trim().min(2).max(200),
        description: z.string().trim().max(1000).optional(),
        status: z.enum(["active", "inactive"]).default("active"),
      }),
    )
    .min(1),
});

export type CreateSubtopicsInput =
  z.infer<typeof createSubtopicsSchema>;


export type CreateSubtopicInput =
  z.infer<typeof createSubtopicSchema>;