import {
  db,
  programs,
  semesters,
  subjects,
  topics,
  units,
  subtopics,
} from "@mediverse/database";

import { asc, eq } from "drizzle-orm";

export async function getLessonNavigationRepository(
  currentSubtopicId: string,
) {
  /*
   * First find where the current lesson belongs
   * in the academic hierarchy.
   *
   * Subtopic
   *   → Topic
   *   → Unit
   *   → Subject
   *   → Semester
   *   → Program
   */
  const [current] = await db
    .select({
      id: subtopics.id,
      programId: programs.id,
    })
    .from(subtopics)
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
    .innerJoin(
      semesters,
      eq(subjects.semesterId, semesters.id),
    )
    .innerJoin(
      programs,
      eq(semesters.programId, programs.id),
    )
    .where(eq(subtopics.id, currentSubtopicId))
    .limit(1);

  if (!current) {
    return {
      previous: null,
      next: null,
    };
  }

  /*
   * Fetch every lesson belonging to the same program.
   *
   * Ordering:
   *
   * Semester
   *   → Subject
   *     → Unit
   *       → Topic
   *         → Subtopic
   *
   * This allows navigation across:
   * - topics
   * - units
   * - subjects
   * - semesters
   *
   * but never jumps to another program.
   */
  const lessonList = await db
    .select({
      id: subtopics.id,
      title: subtopics.title,
    })
    .from(subtopics)
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
    .innerJoin(
      semesters,
      eq(subjects.semesterId, semesters.id),
    )
    .innerJoin(
      programs,
      eq(semesters.programId, programs.id),
    )
    .where(eq(programs.id, current.programId))
    .orderBy(
      asc(semesters.number),
      asc(subjects.name),
      asc(units.unitNumber),
      asc(topics.topicNumber),
      asc(subtopics.subtopicNumber),
    );

  const index = lessonList.findIndex(
    (lesson) => lesson.id === current.id,
  );

  if (index === -1) {
    return {
      previous: null,
      next: null,
    };
  }

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