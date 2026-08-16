import { db } from "@mediverse/database";
import {
  contents,
  progress,
  subjects,
  units,
  topics,
  subtopics,
} from "@mediverse/database";
import {
  and,
  count,
  eq,
  desc,
} from "drizzle-orm";

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




// ..................
export async function getSubjectProgressRepository(
  userId: string,
) {
  const rows = await db
    .select({
      subjectId: subjects.id,
      subjectName: subjects.name,
      total: count(contents.id),
      completed: count(progress.id),
    })
    .from(subjects)
    .innerJoin(
      units,
      eq(units.subjectId, subjects.id),
    )
    .innerJoin(
      topics,
      eq(topics.unitId, units.id),
    )
    .innerJoin(
      subtopics,
      eq(subtopics.topicId, topics.id),
    )
    .innerJoin(
      contents,
      and(
        eq(contents.subtopicId, subtopics.id),
        eq(contents.status, "active"),
      ),
    )
    .leftJoin(
      progress,
      and(
        eq(progress.contentId, contents.id),
        eq(progress.userId, userId),
        eq(progress.completed, true),
      ),
    )
    .where(eq(subjects.status, "active"))
    .groupBy(
      subjects.id,
      subjects.name,
    );

  return rows.map((row) => {
    const total = Number(row.total);
    const completed = Number(row.completed);

    return {
      subjectId: row.subjectId,
      subjectName: row.subjectName,
      total,
      completed,
      percentage:
        total === 0
          ? 0
          : Math.round(
              (completed / total) * 100,
            ),
    };
  });
}





export async function getSingleSubjectProgressRepository(
  userId: string,
  subjectId: string,
) {
  const [{ total }] = await db
    .select({
      total: count(contents.id),
    })
    .from(subjects)
    .innerJoin(
      units,
      eq(units.subjectId, subjects.id),
    )
    .innerJoin(
      topics,
      eq(topics.unitId, units.id),
    )
    .innerJoin(
      subtopics,
      eq(subtopics.topicId, topics.id),
    )
    .innerJoin(
      contents,
      and(
        eq(contents.subtopicId, subtopics.id),
        eq(contents.status, "active"),
      ),
    )
    .where(
      and(
        eq(subjects.id, subjectId),
        eq(subjects.status, "active"),
      ),
    );

  const [{ completed }] = await db
    .select({
      completed: count(progress.id),
    })
    .from(subjects)
    .innerJoin(
      units,
      eq(units.subjectId, subjects.id),
    )
    .innerJoin(
      topics,
      eq(topics.unitId, units.id),
    )
    .innerJoin(
      subtopics,
      eq(subtopics.topicId, topics.id),
    )
    .innerJoin(
      contents,
      and(
        eq(contents.subtopicId, subtopics.id),
        eq(contents.status, "active"),
      ),
    )
    .innerJoin(
      progress,
      and(
        eq(progress.contentId, contents.id),
        eq(progress.userId, userId),
        eq(progress.completed, true),
      ),
    )
    .where(
      and(
        eq(subjects.id, subjectId),
        eq(subjects.status, "active"),
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