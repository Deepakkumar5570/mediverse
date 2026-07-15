import { z } from "zod";

export const SlugSchema = z
  .string()
  .trim()
  .min(2)
  .max(100)
  .regex(/^[a-z0-9-]+$/, "Invalid slug");