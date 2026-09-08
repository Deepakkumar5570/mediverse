import { db, mcqs } from "@mediverse/database";

import {
  and,
  asc,
  eq,
} from "drizzle-orm";

export async function getMcqsBySubtopicRepository(
  subtopicId: string,
) {
  return db
    .select({
      id: mcqs.id,
      subtopicId: mcqs.subtopicId,
      question: mcqs.question,
      optionA: mcqs.optionA,
      optionB: mcqs.optionB,
      optionC: mcqs.optionC,
      optionD: mcqs.optionD,
      difficulty: mcqs.difficulty,
      questionNumber: mcqs.questionNumber,
    })
    .from(mcqs)
    .where(
      and(
        eq(mcqs.subtopicId, subtopicId),
        eq(mcqs.status, "active"),
      ),
    )
    .orderBy(
      asc(mcqs.questionNumber),
    );
}