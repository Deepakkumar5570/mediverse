import { db, subtopics } from "@mediverse/database";
import { asc, eq } from "drizzle-orm";

import type { CreateSubtopicInput } from "../validations";

export async function createSubtopicRepository(
  data: CreateSubtopicInput
) {
  const [subtopic] = await db
    .insert(subtopics)
    .values(data)
    .returning();

  return subtopic;
}

export async function getSubtopicsRepository() {
  return db
    .select()
    .from(subtopics)
    .orderBy(asc(subtopics.subtopicNumber));
}

export async function getSubtopicsByTopicRepository(
  topicId: string
) {
  return db
    .select()
    .from(subtopics)
    .where(eq(subtopics.topicId, topicId))
    .orderBy(asc(subtopics.subtopicNumber));
}