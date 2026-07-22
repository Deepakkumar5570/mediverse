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

export async function getTopicsByUnitRepository(
  unitId: string
) {
  return db
    .select()
    .from(topics)
    .where(eq(topics.unitId, unitId))
    .orderBy(asc(topics.topicNumber));
}