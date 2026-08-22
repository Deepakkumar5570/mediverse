import { db, subtopics } from "@mediverse/database";

import { asc, eq } from "drizzle-orm";

import type { CreateSubtopicInput } from "../validations";

export async function createSubtopicRepository(
  data: CreateSubtopicInput,
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

export async function getSubtopicByIdRepository(
  id: string,
) {
  const [subtopic] = await db
    .select()
    .from(subtopics)
    .where(eq(subtopics.id, id))
    .limit(1);

  return subtopic ?? null;
}

export async function getSubtopicsByTopicRepository(
  topicId: string,
) {
  return db
    .select()
    .from(subtopics)
    .where(eq(subtopics.topicId, topicId))
    .orderBy(asc(subtopics.subtopicNumber));
}

export async function updateSubtopicRepository(
  id: string,
  data: CreateSubtopicInput,
) {
  const [subtopic] = await db
    .update(subtopics)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(subtopics.id, id))
    .returning();

  return subtopic ?? null;
}