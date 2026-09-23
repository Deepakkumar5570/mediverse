import { z } from "zod";

export const CreateSemesterSchema = z.object({
  programId: z.uuid(),

  name: z
    .string()
    .trim()
    .min(2)
    .max(100),

  slug: z
    .string()
    .trim()
    .min(2)
    .max(120)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain only lowercase letters, numbers, and hyphens.",
    ),

  number: z
    .number()
    .int()
    .min(1)
    .max(20),

  status: z
    .enum([
      "active",
      "inactive",
    ])
    .default("active"),
});

export type CreateSemesterInput =
  z.infer<typeof CreateSemesterSchema>;