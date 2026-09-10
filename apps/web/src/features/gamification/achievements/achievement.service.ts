import {
  ACHIEVEMENTS,
  type AchievementCategory,
} from "./achievement-rules";

import {
  getUserAchievementsRepository,
  hasAchievementRepository,
  unlockAchievementRepository,
} from "./achievement.repository";

import {
  awardXpService,
} from "../points/xp.service";

export async function getUserAchievementsService(
  userId: string,
) {
  const achievements =
    await getUserAchievementsRepository(userId);

  return achievements.map((achievement) => {
    const definition = ACHIEVEMENTS.find(
      (item) =>
        item.key === achievement.achievementKey,
    );

    return {
      ...achievement,
      title:
        definition?.title ??
        achievement.achievementKey,
      description:
        definition?.description ?? "",
      category:
        definition?.category ?? null,
      icon:
        definition?.icon ?? "🏆",
      xpReward:
        definition?.xpReward ?? 0,
    };
  });
}

export async function unlockAchievementService(
  userId: string,
  achievementKey: string,
) {
  const definition = ACHIEVEMENTS.find(
    (achievement) =>
      achievement.key === achievementKey,
  );

  if (!definition) {
    throw new Error(
      `Unknown achievement: ${achievementKey}`,
    );
  }

  const alreadyUnlocked =
    await hasAchievementRepository(
      userId,
      achievementKey,
    );

  if (alreadyUnlocked) {
    return {
      unlocked: false,
      achievement: null,
    };
  }

  const achievement =
    await unlockAchievementRepository(
      userId,
      achievementKey,
    );

  if (!achievement) {
    return {
      unlocked: false,
      achievement: null,
    };
  }

  if (definition.xpReward > 0) {
    try {
      await awardXpService(userId, {
        eventKey: `achievement:${achievementKey}`,
        eventType: "achievement_unlocked",
        points: definition.xpReward,
        referenceType: "achievement",
        referenceId: achievement.id,
      });
    } catch (error) {
      console.error(
        "Failed to award achievement XP:",
        error,
      );
    }
  }

  return {
    unlocked: true,
    achievement: {
      ...achievement,
      title: definition.title,
      description: definition.description,
      category: definition.category,
      icon: definition.icon,
      xpReward: definition.xpReward,
    },
  };
}

export async function checkAchievementService(
  userId: string,
  category: AchievementCategory,
  value: number,
) {
  const eligibleAchievements =
    ACHIEVEMENTS.filter(
      (achievement) =>
        achievement.category === category &&
        achievement.requirement > 0 &&
        value >= achievement.requirement,
    );

  const unlocked = [];

  for (const achievement of eligibleAchievements) {
    const result =
      await unlockAchievementService(
        userId,
        achievement.key,
      );

    if (
      result.unlocked &&
      result.achievement
    ) {
      unlocked.push(result.achievement);
    }
  }

  return unlocked;
}

export async function checkMcqAchievementsService(
  userId: string,
  stats: {
    attempted: number;
    correct: number;
    accuracy: number;
  },
) {
  const unlocked = [];

  /*
   * MCQ ATTEMPT milestones
   *
   * These achievements depend on the number
   * of questions attempted.
   *
   * Example:
   * 1 attempt  → First Practice
   * 10 attempts → Curious Mind
   * 50 attempts → Practice Mode
   * 100 attempts → Question Hunter
   * 500 attempts → Knowledge Seeker
   * 1000 attempts → MCQ Master
   */
  const attemptAchievements =
    ACHIEVEMENTS.filter(
      (achievement) =>
        achievement.category === "mcq" &&
        achievement.key.startsWith("mcq_") &&
        achievement.key !== "mcq_correct_10" &&
        achievement.key !== "mcq_accuracy_80" &&
        stats.attempted >=
          achievement.requirement,
    );

  for (const achievement of attemptAchievements) {
    const result =
      await unlockAchievementService(
        userId,
        achievement.key,
      );

    if (
      result.unlocked &&
      result.achievement
    ) {
      unlocked.push(result.achievement);
    }
  }

  /*
   * SHARP MIND
   *
   * This achievement depends on the number
   * of correctly answered MCQs, NOT attempts.
   */
  if (stats.correct >= 10) {
    const result =
      await unlockAchievementService(
        userId,
        "mcq_correct_10",
      );

    if (
      result.unlocked &&
      result.achievement
    ) {
      unlocked.push(result.achievement);
    }
  }

  /*
   * ACCURACY PRO
   *
   * Requires BOTH:
   *
   * - at least 100 attempts
   * - at least 80% accuracy
   */
  if (
    stats.attempted >= 100 &&
    stats.accuracy >= 80
  ) {
    const result =
      await unlockAchievementService(
        userId,
        "mcq_accuracy_80",
      );

    if (
      result.unlocked &&
      result.achievement
    ) {
      unlocked.push(result.achievement);
    }
  }

  return unlocked;
}

export async function checkPerfectSessionAchievementService(
  userId: string,
  totalQuestions: number,
  correctAnswers: number,
) {
  if (
    totalQuestions <= 0 ||
    correctAnswers !== totalQuestions
  ) {
    return [];
  }

  const result =
    await unlockAchievementService(
      userId,
      "perfect_session",
    );

  if (
    result.unlocked &&
    result.achievement
  ) {
    return [result.achievement];
  }

  return [];
}

export async function checkStreakAchievementsService(
  userId: string,
  currentStreak: number,
) {
  return checkAchievementService(
    userId,
    "streak",
    currentStreak,
  );
}

export async function checkLessonAchievementsService(
  userId: string,
  completedLessons: number,
) {
  return checkAchievementService(
    userId,
    "lesson",
    completedLessons,
  );
}