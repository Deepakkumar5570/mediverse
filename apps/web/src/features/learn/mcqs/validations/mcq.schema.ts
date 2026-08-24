import { z } from "zod";

export const createMcqSchema = z.object({
  subtopicId: z.uuid(),

  question: z
    .string()
    .min(2)
    .max(2000),

  optionA: z
    .string()
    .min(1)
    .max(1000),

  optionB: z
    .string()
    .min(1)
    .max(1000),

  optionC: z
    .string()
    .min(1)
    .max(1000),

  optionD: z
    .string()
    .min(1)
    .max(1000),

  correctOption: z
    .number()
    .int()
    .min(1)
    .max(4),

  explanation: z
    .string()
    .max(3000)
    .optional(),

  difficulty: z.enum([
    "easy",
    "medium",
    "hard",
  ]),

  questionNumber: z
    .number()
    .int()
    .positive(),

  status: z.enum([
    "draft",
    "active",
    "inactive",
  ]),
});

export type CreateMcqInput =
  z.infer<typeof createMcqSchema>;