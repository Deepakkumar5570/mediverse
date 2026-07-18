import { z } from "zod";

import {
  NameSchema,
  SlugSchema,
  DescriptionSchema,
  ColorSchema,
  IconSchema,
} from "@mediverse/validation";

export const CreateProgramSchema = z.object({
  name: NameSchema,

  slug: SlugSchema,

  code: z.string().trim().min(2).max(20),

  description: DescriptionSchema,

  duration: z.number().int().positive(),

  status: z
    .enum(["active", "inactive"])
    .default("active"),

  icon: IconSchema,

  color: ColorSchema,
});

export type CreateProgramInput =
  z.infer<typeof CreateProgramSchema>;