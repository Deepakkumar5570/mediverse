import {
  awardXpRepository,
  createGamificationRepository,
  getGamificationRepository,
} from "./xp.repository";

import {
  getLevelProgress,
} from "./xp-rules";

export async function getGamificationService(
  userId: string,
) {
  let gamification =
    await getGamificationRepository(
      userId,
    );

  if (!gamification) {
    gamification =
      await createGamificationRepository(
        userId,
      );
  }

  if (!gamification) {
    throw new Error(
      "Unable to initialize gamification profile",
    );
  }

  return {
    ...gamification,
    ...getLevelProgress(
      gamification.totalXp,
    ),
  };
}

export async function awardXpService(
  userId: string,
  data: {
    eventKey: string;
    eventType: string;
    points: number;
    referenceType?: string;
    referenceId?: string;
  },
) {
  if (data.points <= 0) {
    throw new Error(
      "XP points must be greater than zero",
    );
  }

  const result =
    await awardXpRepository({
      userId,
      ...data,
    });

  const stats =
    getLevelProgress(
      result.gamification.totalXp,
    );

  return {
    awarded: result.awarded,
    points: result.awarded
      ? data.points
      : 0,
    event: result.event,
    totalXp:
      result.gamification.totalXp,
    level:
      stats.currentLevel,
    levelName:
      stats.currentLevelName,
    progress:
      stats.progress,
    xpToNextLevel:
      stats.xpToNextLevel,
    nextLevel:
      stats.nextLevel,
    nextLevelName:
      stats.nextLevelName,
  };
}