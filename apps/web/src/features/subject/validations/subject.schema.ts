import { z } from "zod";

export const CreateSubjectSchema = z.object({
  programId: z.uuid(),

  name: z
    .string()
    .trim()
    .min(2)
    .max(150),

  slug: z
    .string()
    .trim()
    .min(2)
    .max(180),

  code: z
    .string()
    .trim()
    .min(2)
    .max(30),

  description: z
    .string()
    .optional(),

  semester: z
    .number()
    .int()
    .min(1)
    .max(12),

  status: z
    .enum([
      "active",
      "inactive",
    ])
    .default("active"),
});

export type CreateSubjectInput =
  z.infer<typeof CreateSubjectSchema>;