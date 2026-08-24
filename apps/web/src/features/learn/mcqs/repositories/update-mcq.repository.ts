import {
  db,
  mcqs,
} from "@mediverse/database";

import { eq } from "drizzle-orm";

import type {
  CreateMcqInput,
} from "../validations";

export async function updateMcqRepository(
  id: string,
  data: CreateMcqInput,
) {
  const [mcq] = await db
    .update(mcqs)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(mcqs.id, id))
    .returning();

  return mcq ?? null;
}