import {
  db,
  mcqAttempts,
  progress,
} from "@mediverse/database";

import {
  and,
  eq,
  isNotNull,
} from "drizzle-orm";

export async function getActivityTimestampsRepository(
  userId: string,
) {
  const [lessonRows, mcqRows] =
    await Promise.all([
      db
        .select({
          activityAt: progress.completedAt,
        })
        .from(progress)
        .where(
          and(
            eq(progress.userId, userId),
            eq(progress.completed, true),
            isNotNull(progress.completedAt),
          ),
        ),

      db
        .select({
          activityAt: mcqAttempts.attemptedAt,
        })
        .from(mcqAttempts)
        .where(eq(mcqAttempts.userId, userId)),
    ]);

  return {
    lessonActivity: lessonRows
      .map((row) => row.activityAt)
      .filter(
        (date): date is Date =>
          date instanceof Date,
      ),

    mcqActivity: mcqRows
      .map((row) => row.activityAt)
      .filter(
        (date): date is Date =>
          date instanceof Date,
      ),
  };
}