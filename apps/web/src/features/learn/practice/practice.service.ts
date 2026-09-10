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

import {
  checkMcqAchievementsService,
  checkPerfectSessionAchievementService,
} from "@/src/features/gamification/achievements/achievement.service";

import {
  checkUserStreakAchievementsService,
} from "@/src/features/profile/services/activity.service";

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
        eventType:
          "mcq_first_attempt",
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

  /*
   * Check MCQ achievements after
   * recording the attempt.
   */
  let unlockedAchievements: Awaited<
    ReturnType<
      typeof checkMcqAchievementsService
    >
  > = [];

  try {
    const stats =
      await getMcqStatsRepository(
        userId,
      );

    unlockedAchievements =
      await checkMcqAchievementsService(
        userId,
        stats,
      );
  } catch (error) {
    console.error(
      "Failed to check MCQ achievements:",
      error,
    );
  }

  /*
   * Check streak achievements after
   * the MCQ attempt because an MCQ
   * attempt counts as learning activity.
   */
  try {
    const streakAchievements =
      await checkUserStreakAchievementsService(
        userId,
      );

    unlockedAchievements.push(
      ...streakAchievements,
    );
  } catch (error) {
    console.error(
      "Failed to check streak achievements:",
      error,
    );
  }

  /*
   * Keep all original attempt fields while
   * exposing newly unlocked achievements.
   */
  return {
    ...attempt,
    unlockedAchievements,
  };
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

  /*
   * Practice session completion XP.
   */
  try {
    await awardXpService(userId, {
      eventKey: `practice-session:completed:${sessionId}`,
      eventType:
        "practice_session_completed",
      points:
        XP_REWARDS.PRACTICE_SESSION_COMPLETED,
      referenceType:
        "practice_session",
      referenceId: sessionId,
    });
  } catch (error) {
    console.error(
      "Failed to award practice session XP:",
      error,
    );
  }

  /*
   * Check Perfect Session achievement.
   */
  let unlockedAchievements: Awaited<
    ReturnType<
      typeof checkPerfectSessionAchievementService
    >
  > = [];

  try {
    unlockedAchievements =
      await checkPerfectSessionAchievementService(
        userId,
        data.totalQuestions,
        data.correctAnswers,
      );
  } catch (error) {
    console.error(
      "Failed to check perfect session achievement:",
      error,
    );
  }

  /*
   * Check streak achievements after
   * completing a practice session.
   *
   * The activity itself was already recorded
   * through the MCQ attempts, so this only
   * evaluates the current streak.
   */
  try {
    const streakAchievements =
      await checkUserStreakAchievementsService(
        userId,
      );

    unlockedAchievements.push(
      ...streakAchievements,
    );
  } catch (error) {
    console.error(
      "Failed to check streak achievements:",
      error,
    );
  }

  /*
   * Keep all original session fields while
   * exposing newly unlocked achievements.
   */
  return {
    ...session,
    unlockedAchievements,
  };
}

export async function getMcqStatsService(
  userId: string,
) {
  return getMcqStatsRepository(
    userId,
  );
}