import {
  db,
  mcqs,
} from "@mediverse/database";

import type {
  CreateMcqInput,
} from "../validations";

export async function createMcqRepository(
  data: CreateMcqInput,
) {
  const [mcq] = await db
    .insert(mcqs)
    .values(data)
    .returning();

  return mcq;
}