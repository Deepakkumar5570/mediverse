import {
  createMcqAttemptRepository,
  createPracticeSessionRepository,
  getMcqStatsRepository,
  updatePracticeSessionRepository,
} from "./practice.repository";

import {
  awardXpService,
} from "@/src/features/gamification/points/xp.service";

import {
  XP_REWARDS,
} from "@/src/features/gamification/points/xp-rules";

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
  const attempt =
    await createMcqAttemptRepository({
      userId,
      ...data,
    });

  /**
   * First attempt on a question earns XP.
   *
   * The unique event key makes this safe even
   * if the same MCQ is attempted multiple times.
   */
  let firstAttemptAwarded = false;

  try {
    const result =
      await awardXpService(userId, {
        eventKey: `mcq:first-attempt:${data.mcqId}`,
        eventType: "mcq_first_attempt",
        points:
          XP_REWARDS.MCQ_FIRST_ATTEMPT,
        referenceType: "mcq",
        referenceId: data.mcqId,
      });

    firstAttemptAwarded =
      result.awarded;

    /**
     * Correct-answer XP is only awarded when
     * this was the user's first attempt.
     *
     * Therefore:
     *
     * First attempt wrong → +2 XP
     * Second attempt correct → +0 XP
     *
     * First attempt correct → +7 XP total
     * (+2 attempt +5 correct)
     */
    if (
      firstAttemptAwarded &&
      data.correct
    ) {
      await awardXpService(userId, {
        eventKey: `mcq:first-attempt-correct:${data.mcqId}`,
        eventType:
          "mcq_first_attempt_correct",
        points:
          XP_REWARDS.MCQ_FIRST_ATTEMPT_CORRECT,
        referenceType: "mcq",
        referenceId: data.mcqId,
      });
    }
  } catch (error) {
    console.error(
      "Failed to award MCQ XP:",
      error,
    );
  }

  return attempt;
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
  const session =
    await updatePracticeSessionRepository(
      sessionId,
      userId,
      {
        ...data,
        completedAt: new Date(),
      },
    );

  try {
    await awardXpService(userId, {
      eventKey: `practice-session:completed:${sessionId}`,
      eventType:
        "practice_session_completed",
      points:
        XP_REWARDS.PRACTICE_SESSION_COMPLETED,
      referenceType: "practice_session",
      referenceId: sessionId,
    });
  } catch (error) {
    console.error(
      "Failed to award practice session XP:",
      error,
    );
  }

  return session;
}

export async function getMcqStatsService(
  userId: string,
) {
  return getMcqStatsRepository(userId);
}