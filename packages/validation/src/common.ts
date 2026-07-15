import { z } from "zod";

export const NameSchema = z.string().trim().min(2).max(100);

export const DescriptionSchema = z
  .string()
  .trim()
  .max(2000)
  .optional();

export const ColorSchema = z
  .string()
  .trim()
  .optional();

export const IconSchema = z
  .string()
  .trim()
  .optional();