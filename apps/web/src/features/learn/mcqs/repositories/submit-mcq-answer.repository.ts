import { db, mcqs } from "@mediverse/database";
import { eq } from "drizzle-orm";

export async function submitMcqAnswerRepository(
  mcqId: string,
  selectedOption: number,
) {
  const [mcq] = await db
    .select({
      id: mcqs.id,
      correctOption: mcqs.correctOption,
      explanation: mcqs.explanation,
    })
    .from(mcqs)
    .where(eq(mcqs.id, mcqId))
    .limit(1);

  if (!mcq) {
    return null;
  }

  return {
    correct: mcq.correctOption === selectedOption,
    explanation: mcq.explanation,
  };
}