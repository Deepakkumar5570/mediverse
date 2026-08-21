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
  asc,
  count,
  desc,
  eq,
  isNull,
  or,
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




export async function getSingleUnitProgressRepository(
  userId: string,
  unitId: string,
) {
  const [{ total }] = await db
    .select({
      total: count(contents.id),
    })
    .from(units)
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
      eq(units.id, unitId),
    );

  const [{ completed }] = await db
    .select({
      completed: count(progress.id),
    })
    .from(units)
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
      eq(units.id, unitId),
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



export async function getUnitProgressRepository(
  userId: string,
) {
  const rows = await db
    .select({
      subjectId: subjects.id,
      unitId: units.id,
      unitTitle: units.title,
      unitNumber: units.unitNumber,
      total: count(contents.id),
      completed: count(progress.id),
    })
    .from(subjects)
    .innerJoin(
      units,
      eq(units.subjectId, subjects.id),
    )
    .leftJoin(
      topics,
      eq(topics.unitId, units.id),
    )
    .leftJoin(
      subtopics,
      eq(subtopics.topicId, topics.id),
    )
    .leftJoin(
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
      units.id,
      units.title,
      units.unitNumber,
    )
    .orderBy(
      asc(units.unitNumber),
    );

  return rows.map((row) => {
    const total = Number(row.total);
    const completed = Number(row.completed);

    return {
      subjectId: row.subjectId,
      unitId: row.unitId,
      unitTitle: row.unitTitle,
      unitNumber: row.unitNumber,
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




export async function getSingleTopicProgressRepository(
  userId: string,
  topicId: string,
) {
  const [{ total }] = await db
    .select({
      total: count(contents.id),
    })
    .from(topics)
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
      eq(topics.id, topicId),
    );

  const [{ completed }] = await db
    .select({
      completed: count(progress.id),
    })
    .from(topics)
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
      eq(topics.id, topicId),
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





export async function getRecentLearningActivityRepository(
  userId: string,
) {
  const rows = await db
    .select({
      progressId: progress.id,
      contentId: contents.id,
      contentTitle: contents.title,
      completed: progress.completed,
      completedAt: progress.completedAt,
      updatedAt: progress.updatedAt,

      subjectId: subjects.id,
      subjectName: subjects.name,

      unitId: units.id,
      unitTitle: units.title,

      topicId: topics.id,
      topicTitle: topics.title,

      subtopicId: subtopics.id,
      subtopicTitle: subtopics.title,
    })
    .from(progress)
    .innerJoin(
      contents,
      eq(progress.contentId, contents.id),
    )
    .innerJoin(
      subtopics,
      eq(contents.subtopicId, subtopics.id),
    )
    .innerJoin(
      topics,
      eq(subtopics.topicId, topics.id),
    )
    .innerJoin(
      units,
      eq(topics.unitId, units.id),
    )
    .innerJoin(
      subjects,
      eq(units.subjectId, subjects.id),
    )
    .where(
      and(
        eq(progress.userId, userId),
        eq(contents.status, "active"),
      ),
    )
    .orderBy(desc(progress.updatedAt))
    .limit(10);

  return rows;
}




export async function getContinueLearningRepository(
  userId: string,
) {
  const rows = await db
    .select({
      contentId: contents.id,
      contentTitle: contents.title,
      contentSummary: contents.summary,
      readingTime: contents.readingTime,

      subjectId: subjects.id,
      subjectName: subjects.name,

      unitId: units.id,
      unitTitle: units.title,
      unitNumber: units.unitNumber,

      topicId: topics.id,
      topicTitle: topics.title,

      subtopicId: subtopics.id,
      subtopicTitle: subtopics.title,
      subtopicNumber: subtopics.subtopicNumber,
    })
    .from(contents)
    .innerJoin(
      subtopics,
      eq(contents.subtopicId, subtopics.id),
    )
    .innerJoin(
      topics,
      eq(subtopics.topicId, topics.id),
    )
    .innerJoin(
      units,
      eq(topics.unitId, units.id),
    )
    .innerJoin(
      subjects,
      eq(units.subjectId, subjects.id),
    )
    .leftJoin(
      progress,
      and(
        eq(progress.contentId, contents.id),
        eq(progress.userId, userId),
      ),
    )
    .where(
      and(
        eq(contents.status, "active"),
        eq(subjects.status, "active"),
        or(
          isNull(progress.id),
          eq(progress.completed, false),
        ),
      ),
    )
    .orderBy(
      asc(subjects.name),
      asc(units.unitNumber),
      asc(topics.id),
      asc(subtopics.subtopicNumber),
    )
    .limit(1);

  return rows[0] ?? null;
}








