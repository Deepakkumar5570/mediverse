import { z } from "zod";

export const CreateSemesterSchema = z.object({
  programId: z.uuid(),

  name: z
    .string()
    .trim()
    .min(2)
    .max(100),

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