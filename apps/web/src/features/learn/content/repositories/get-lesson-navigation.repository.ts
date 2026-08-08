import {
  db,
  subtopics,
} from "@mediverse/database";

import {
  asc,
  eq,
} from "drizzle-orm";

export async function getLessonNavigationRepository(
  currentSubtopicId: string,
) {
  const currentResult = await db
    .select()
    .from(subtopics)
    .where(eq(subtopics.id, currentSubtopicId));

  const current = currentResult[0];

  if (!current) {
    return {
      previous: null,
      next: null,
    };
  }

  const lessonList = await db
    .select()
    .from(subtopics)
    .where(eq(subtopics.topicId, current.topicId))
    .orderBy(asc(subtopics.subtopicNumber));

  const index = lessonList.findIndex(
    (lesson) => lesson.id === current.id,
  );

  return {
    previous:
      index > 0
        ? lessonList[index - 1]
        : null,

    next:
      index < lessonList.length - 1
        ? lessonList[index + 1]
        : null,
  };
}