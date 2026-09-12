import { z } from "zod";

export const createUnitSchema = z.object({
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
    .min(1),

  description: z
    .string()
    .optional(),

  status: z
    .enum(["active", "inactive"])
    .default("active"),
});

export type CreateUnitInput =
  z.infer<typeof createUnitSchema>;


/**
 * Batch unit creation
 */
export const createUnitsSchema = z.object({
  subjectId: z.uuid(
    "Please select a subject",
  ),

  units: z
    .array(
      z.object({
        title: z
          .string()
          .trim()
          .min(
            2,
            "Unit title must be at least 2 characters",
          )
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
    .min(
      1,
      "Add at least one unit",
    ),
});

export type CreateUnitsInput =
  z.infer<typeof createUnitsSchema>;

