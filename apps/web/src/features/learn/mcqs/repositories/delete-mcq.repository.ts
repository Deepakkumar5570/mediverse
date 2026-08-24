import {
  db,
  mcqs,
} from "@mediverse/database";

import { eq } from "drizzle-orm";

export async function deleteMcqRepository(
  id: string,
) {
  const [deletedMcq] = await db
    .delete(mcqs)
    .where(eq(mcqs.id, id))
    .returning();

  return deletedMcq ?? null;
}