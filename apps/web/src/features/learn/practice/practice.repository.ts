import {
  db,
  mcqAttempts,
  practiceSessions,
} from "@mediverse/database";

import { and, eq } from "drizzle-orm";

export async function createPracticeSessionRepository(data: {
  userId: string;
  mode: "quick" | "topic" | "random";
}) {
  const [session] = await db
    .insert(practiceSessions)
    .values({
      userId: data.userId,
      mode: data.mode,
    })
    .returning();

  return session;
}

export async function createMcqAttemptRepository(data: {
  sessionId: string;
  userId: string;
  mcqId: string;
  selectedOption: number;
  correct: boolean;
  timeTaken?: number | null;
}) {
  const [attempt] = await db
    .insert(mcqAttempts)
    .values({
      sessionId: data.sessionId,
      userId: data.userId,
      mcqId: data.mcqId,
      selectedOption: data.selectedOption,
      correct: data.correct,
      timeTaken: data.timeTaken ?? null,
    })
    .returning();

  return attempt;
}

export async function updatePracticeSessionRepository(
  sessionId: string,
  userId: string,
  data: {
    totalQuestions?: number;
    correctAnswers?: number;
    wrongAnswers?: number;
    completedAt?: Date;
  },
) {
  const [session] = await db
    .update(practiceSessions)
    .set(data)
    .where(
      and(
        eq(practiceSessions.id, sessionId),
        eq(practiceSessions.userId, userId),
      ),
    )
    .returning();

  return session;
}

export async function getMcqStatsRepository(userId: string) {
  const attempts = await db
    .select({
      correct: mcqAttempts.correct,
    })
    .from(mcqAttempts)
    .where(eq(mcqAttempts.userId, userId));

  const attempted = attempts.length;

  const correct = attempts.filter(
    (attempt) => attempt.correct,
  ).length;

  const wrong = attempted - correct;

  const accuracy =
    attempted > 0
      ? Number(((correct / attempted) * 100).toFixed(1))
      : 0;

  return {
    attempted,
    correct,
    wrong,
    accuracy,
  };
}