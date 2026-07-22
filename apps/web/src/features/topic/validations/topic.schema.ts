import { z } from "zod";

export const createTopicSchema = z.object({
  unitId: z.string().uuid("Please select a unit"),

  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200),

  slug: z
    .string()
    .min(3)
    .max(200),

  topicNumber: z
    .coerce
    .number()
    .int()
    .positive(),

  description: z.string().optional(),

  status: z.enum(["active", "inactive"]),
});

export type CreateTopicInput = z.infer<typeof createTopicSchema>;