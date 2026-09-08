import {
  createMcqAttemptRepository,
  createPracticeSessionRepository,
  getMcqStatsRepository,
  updatePracticeSessionRepository,
} from "./practice.repository";

export async function createPracticeSessionService(
  userId: string,
  mode: "quick" | "topic" | "random",
) {
  return createPracticeSessionRepository({
    userId,
    mode,
  });
}

export async function recordMcqAttemptService(
  userId: string,
  data: {
    sessionId: string;
    mcqId: string;
    selectedOption: number;
    correct: boolean;
    timeTaken?: number | null;
  },
) {
  return createMcqAttemptRepository({
    userId,
    ...data,
  });
}

export async function completePracticeSessionService(
  userId: string,
  sessionId: string,
  data: {
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
  },
) {
  return updatePracticeSessionRepository(
    sessionId,
    userId,
    {
      ...data,
      completedAt: new Date(),
    },
  );
}

export async function getMcqStatsService(userId: string) {
  return getMcqStatsRepository(userId);
}