import { z } from "zod";

export const CreateUnitSchema = z.object({
  subjectId: z.uuid(),

  title: z
    .string()
    .trim()
    .min(2)
    .max(200),

  slug: z
    .string()
    .trim()
    .min(2)
    .max(220),

  unitNumber: z
    .number()
    .int()
    .min(1)
    .max(50),

  description: z
    .string()
    .optional(),

  status: z
    .enum(["active", "inactive"])
    .default("active"),
});

export type CreateUnitInput =
  z.infer<typeof CreateUnitSchema>;