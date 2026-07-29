import { db, contents } from "@mediverse/database";
import { asc, eq } from "drizzle-orm";

import type { CreateContentInput } from "../validations";

export async function createContentRepository(
  data: CreateContentInput
) {
  const [content] = await db
    .insert(contents)
    .values(data)
    .returning();

  return content;
}

export async function getContentsRepository() {
  return db
    .select()
    .from(contents)
    .orderBy(asc(contents.title));
}

export async function getContentsBySubtopicRepository(
  subtopicId: string
) {
  return db
    .select()
    .from(contents)
    .where(eq(contents.subtopicId, subtopicId))
    .orderBy(asc(contents.title));
}

export async function getContentBySlugRepository(
  slug: string
) {
  const [content] = await db
    .select()
    .from(contents)
    .where(eq(contents.slug, slug));

  return content ?? null;
}


export async function updateContentRepository(
  id: string,
  data: CreateContentInput
) {
  const [content] = await db
    .update(contents)
    .set(data)
    .where(eq(contents.id, id))
    .returning();

  return content;
}

export async function deleteContentRepository(
  id: string
) {
  const [content] = await db
    .delete(contents)
    .where(eq(contents.id, id))
    .returning();

  return content ?? null;
}