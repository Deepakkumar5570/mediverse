"use server";

import { requireUserId } from "@/src/lib/auth/require-user-id";

import {
  checkAchievementService,
  checkLessonAchievementsService,
  checkMcqAchievementsService,
  checkPerfectSessionAchievementService,
  checkStreakAchievementsService,
  getUserAchievementsService,
  unlockAchievementService,
} from "./achievement.service";

import type { AchievementCategory } from "./achievement-rules";

export async function getUserAchievementsAction() {
  const userId = await requireUserId();

  return getUserAchievementsService(userId);
}

export async function unlockAchievementAction(
  achievementKey: string,
) {
  const userId = await requireUserId();

  return unlockAchievementService(
    userId,
    achievementKey,
  );
}

export async function checkAchievementAction(
  category: AchievementCategory,
  value: number,
) {
  const userId = await requireUserId();

  return checkAchievementService(
    userId,
    category,
    value,
  );
}

export async function checkLessonAchievementsAction(
  completedLessons: number,
) {
  const userId = await requireUserId();

  return checkLessonAchievementsService(
    userId,
    completedLessons,
  );
}

export async function checkMcqAchievementsAction(
  stats: {
    attempted: number;
    correct: number;
    accuracy: number;
  },
) {
  const userId = await requireUserId();

  return checkMcqAchievementsService(
    userId,
    stats,
  );
}

export async function checkPerfectSessionAchievementAction(
  totalQuestions: number,
  correctAnswers: number,
) {
  const userId = await requireUserId();

  return checkPerfectSessionAchievementService(
    userId,
    totalQuestions,
    correctAnswers,
  );
}

export async function checkStreakAchievementsAction(
  currentStreak: number,
) {
  const userId = await requireUserId();

  return checkStreakAchievementsService(
    userId,
    currentStreak,
  );
}