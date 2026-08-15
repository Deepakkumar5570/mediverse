import { db, contents, progress } from "@mediverse/database";
import { and, count, desc, eq } from "drizzle-orm";

export async function getProgressByUserRepository(
    userId: string
) {
    return db
        .select()
        .from(progress)
        .where(eq(progress.userId, userId))
        .orderBy(desc(progress.updatedAt));
}

export async function getProgressByUserAndContentRepository(
    userId: string,
    contentId: string
) {
    const [result] = await db
        .select()
        .from(progress)
        .where(
            and(
                eq(progress.userId, userId),
                eq(progress.contentId, contentId)
            )
        );

    return result ?? null;
}

export async function markContentCompleteRepository(
    userId: string,
    contentId: string
) {
    const existing =
        await getProgressByUserAndContentRepository(
            userId,
            contentId
        );

    if (existing) {
        const [result] = await db
            .update(progress)
            .set({
                completed: true,
                completedAt: new Date(),
                updatedAt: new Date(),
            })
            .where(eq(progress.id, existing.id))
            .returning();

        return result;
    }

    const [result] = await db
        .insert(progress)
        .values({
            userId,
            contentId,
            completed: true,
            completedAt: new Date(),
        })
        .returning();

    return result;
}

export async function markContentIncompleteRepository(
    userId: string,
    contentId: string
) {
    const existing =
        await getProgressByUserAndContentRepository(
            userId,
            contentId
        );

    if (!existing) {
        return null;
    }

    const [result] = await db
        .update(progress)
        .set({
            completed: false,
            completedAt: null,
            updatedAt: new Date(),
        })
        .where(eq(progress.id, existing.id))
        .returning();

    return result;
}




export async function getProgressSummaryRepository(
  userId: string,
) {
  const [{ total }] = await db
    .select({
      total: count(contents.id),
    })
    .from(contents)
    .where(eq(contents.status, "active"));

  const [{ completed }] = await db
    .select({
      completed: count(progress.id),
    })
    .from(progress)
    .innerJoin(
      contents,
      eq(progress.contentId, contents.id),
    )
    .where(
      and(
        eq(progress.userId, userId),
        eq(progress.completed, true),
        eq(contents.status, "active"),
      ),
    );

  const totalCount = Number(total);
  const completedCount = Number(completed);

  return {
    total: totalCount,
    completed: completedCount,
    percentage:
      totalCount === 0
        ? 0
        : Math.round(
            (completedCount / totalCount) * 100,
          ),
  };
}



export async function getSubtopicProgressRepository(
  userId: string,
  subtopicId: string,
) {
  const [{ total }] = await db
    .select({
      total: count(contents.id),
    })
    .from(contents)
    .where(
      and(
        eq(contents.subtopicId, subtopicId),
        eq(contents.status, "active"),
      ),
    );

  const [{ completed }] = await db
    .select({
      completed: count(progress.id),
    })
    .from(progress)
    .innerJoin(
      contents,
      eq(progress.contentId, contents.id),
    )
    .where(
      and(
        eq(progress.userId, userId),
        eq(progress.completed, true),
        eq(contents.subtopicId, subtopicId),
        eq(contents.status, "active"),
      ),
    );

  const totalCount = Number(total);
  const completedCount = Number(completed);

  return {
    total: totalCount,
    completed: completedCount,
    percentage:
      totalCount === 0
        ? 0
        : Math.round(
            (completedCount / totalCount) * 100,
          ),
  };
}