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

  description: z
    .string()
    .optional(),

  status: z.enum(["active", "inactive"]),
});

export type CreateTopicInput =
  z.infer<typeof createTopicSchema>;


/**
 * Batch topic creation
 *
 * Used by Admin Content Builder.
 */
export const createTopicsSchema = z.object({
  unitId: z.string().uuid("Please select a unit"),

  topics: z
    .array(
      z.object({
        title: z
          .string()
          .trim()
          .min(3, "Title must be at least 3 characters")
          .max(200),

        description: z
          .string()
          .trim()
          .max(1000)
          .optional(),

        status: z
          .enum(["active", "inactive"])
          .default("active"),
      }),
    )
    .min(1, "Add at least one topic"),
});

export type CreateTopicsInput =
  z.infer<typeof createTopicsSchema>;

// export type CreateTopicInput = z.infer<typeof createTopicSchema>;