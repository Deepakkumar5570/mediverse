import {
  db,
  userAchievements,
} from "@mediverse/database";

import {
  and,
  eq,
} from "drizzle-orm";

export async function getUserAchievementsRepository(
  userId: string,
) {
  return db
    .select()
    .from(userAchievements)
    .where(
      eq(
        userAchievements.userId,
        userId,
      ),
    );
}

export async function hasAchievementRepository(
  userId: string,
  achievementKey: string,
) {
  const [achievement] =
    await db
      .select({
        id: userAchievements.id,
      })
      .from(userAchievements)
      .where(
        and(
          eq(
            userAchievements.userId,
            userId,
          ),
          eq(
            userAchievements.achievementKey,
            achievementKey,
          ),
        ),
      )
      .limit(1);

  return Boolean(achievement);
}

export async function unlockAchievementRepository(
  userId: string,
  achievementKey: string,
) {
  const [achievement] =
    await db
      .insert(userAchievements)
      .values({
        userId,
        achievementKey,
      })
      .onConflictDoNothing({
        target: [
          userAchievements.userId,
          userAchievements.achievementKey,
        ],
      })
      .returning();

  return achievement ?? null;
}