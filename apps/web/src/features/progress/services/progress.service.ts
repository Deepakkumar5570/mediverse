import {
  awardXpService,
} from "@/src/features/gamification/points/xp.service";

import {
  XP_REWARDS,
} from "@/src/features/gamification/points/xp-rules";

import {
  checkLessonAchievementsService,
} from "@/src/features/gamification/achievements/achievement.service";

import {
  checkUserStreakAchievementsService,
} from "@/src/features/profile/services/activity.service";

import {
  getProgressByUserRepository,
  getProgressByUserAndContentRepository,
  getProgressSummaryRepository,
  getSubtopicProgressRepository,
  getSubjectProgressRepository,
  getSingleSubjectProgressRepository,
  getSingleUnitProgressRepository,
  getSingleTopicProgressRepository,
  getUnitProgressRepository,
  getRecentLearningActivityRepository,
  getContinueLearningRepository,
  markContentCompleteRepository,
  markContentIncompleteRepository,
} from "../repositories/progress.repository";

export async function getSingleTopicProgressService(
  userId: string,
  topicId: string,
) {
  return getSingleTopicProgressRepository(
    userId,
    topicId,
  );
}

export async function getUnitProgressService(
  userId: string,
) {
  return getUnitProgressRepository(
    userId,
  );
}

export async function getSubjectProgressService(
  userId: string,
) {
  return getSubjectProgressRepository(
    userId,
  );
}

export async function getSingleSubjectProgressService(
  userId: string,
  subjectId: string,
) {
  return getSingleSubjectProgressRepository(
    userId,
    subjectId,
  );
}

export async function getSingleUnitProgressService(
  userId: string,
  unitId: string,
) {
  return getSingleUnitProgressRepository(
    userId,
    unitId,
  );
}

export async function getUserProgressService(
  userId: string,
) {
  return getProgressByUserRepository(
    userId,
  );
}

export async function getContentProgressService(
  userId: string,
  contentId: string,
) {
  return getProgressByUserAndContentRepository(
    userId,
    contentId,
  );
}

export async function completeContentService(
  userId: string,
  contentId: string,
) {
  const progress =
    await markContentCompleteRepository(
      userId,
      contentId,
    );

  /*
   * Lesson completion XP.
   */
  try {
    await awardXpService(userId, {
      eventKey: `lesson:completed:${contentId}`,
      eventType:
        "lesson_completed",
      points:
        XP_REWARDS.LESSON_COMPLETED,
      referenceType: "content",
      referenceId: contentId,
    });
  } catch (error) {
    console.error(
      "Failed to award lesson XP:",
      error,
    );
  }

  /*
   * Check lesson achievements.
   */
  let unlockedAchievements: Awaited<
    ReturnType<
      typeof checkLessonAchievementsService
    >
  > = [];

  try {
    const summary =
      await getProgressSummaryRepository(
        userId,
      );

    unlockedAchievements =
      await checkLessonAchievementsService(
        userId,
        summary.completed,
      );
  } catch (error) {
    console.error(
      "Failed to check lesson achievements:",
      error,
    );
  }

  /*
   * Check streak achievements after
   * completing a lesson.
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

  return {
    ...progress,
    unlockedAchievements,
  };
}

export async function incompleteContentService(
  userId: string,
  contentId: string,
) {
  return markContentIncompleteRepository(
    userId,
    contentId,
  );
}

export async function getProgressSummaryService(
  userId: string,
) {
  return getProgressSummaryRepository(
    userId,
  );
}

export async function getSubtopicProgressService(
  userId: string,
  subtopicId: string,
) {
  return getSubtopicProgressRepository(
    userId,
    subtopicId,
  );
}

export async function getRecentLearningActivityService(
  userId: string,
) {
  return getRecentLearningActivityRepository(
    userId,
  );
}

export async function getContinueLearningService(
  userId: string,
) {
  return getContinueLearningRepository(
    userId,
  );
}