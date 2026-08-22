import { db, topics } from "@mediverse/database";
import { asc, eq } from "drizzle-orm";

import type { CreateTopicInput } from "../validations";

export async function createTopicRepository(
  data: CreateTopicInput
) {
  const [topic] = await db
    .insert(topics)
    .values(data)
    .returning();

  return topic;
}

export async function getTopicsRepository() {
  return db
    .select()
    .from(topics)
    .orderBy(asc(topics.topicNumber));
}


export async function getTopicByIdRepository(
  id: string
) {
  const [topic] = await db
    .select()
    .from(topics)
    .where(eq(topics.id, id))
    .limit(1);

  return topic ?? null;
}

export async function getTopicsByUnitRepository(
  unitId: string
) {
  return db
    .select()
    .from(topics)
    .where(eq(topics.unitId, unitId))
    .orderBy(asc(topics.topicNumber));
}


export async function updateTopicRepository(
  id: string,
  data: CreateTopicInput,
) {
  const [topic] = await db
    .update(topics)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(topics.id, id))
    .returning();

  return topic ?? null;
}