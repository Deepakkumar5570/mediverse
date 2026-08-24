import {
  db,
  mcqs,
} from "@mediverse/database";

import {
  asc,
  eq,
} from "drizzle-orm";

export async function getMcqsRepository() {
  return db
    .select()
    .from(mcqs)
    .orderBy(
      asc(mcqs.questionNumber),
    );
}

export async function getMcqByIdRepository(
  id: string,
) {
  const [mcq] = await db
    .select()
    .from(mcqs)
    .where(eq(mcqs.id, id))
    .limit(1);

  return mcq ?? null;
}

export async function getMcqsBySubtopicRepository(
  subtopicId: string,
) {
  return db
    .select()
    .from(mcqs)
    .where(
      eq(mcqs.subtopicId, subtopicId),
    )
    .orderBy(
      asc(mcqs.questionNumber),
    );
}