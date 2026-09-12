import { db, subtopics } from "@mediverse/database";

import { asc, eq, max } from "drizzle-orm";

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




export async function createSubtopicsRepository(
  topicId: string,
  items: Array<{
    title: string;
    description?: string;
    status: "active" | "inactive";
  }>,
) {
  return db.transaction(async (tx) => {
    const [maxResult] = await tx
      .select({
        value: max(subtopics.subtopicNumber),
      })
      .from(subtopics)
      .where(eq(subtopics.topicId, topicId));

    let nextNumber = Number(maxResult?.value ?? 0) + 1;

    const usedSlugs = new Set<string>();

    const existingSlugs = await tx
      .select({
        slug: subtopics.slug,
      })
      .from(subtopics);

    for (const item of existingSlugs) {
      usedSlugs.add(item.slug);
    }

    const created = [];

    for (const item of items) {
      const baseSlug =
        item.title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .replace(/^-|-$/g, "") || `subtopic-${nextNumber}`;

      let slug = baseSlug;
      let suffix = 2;

      while (usedSlugs.has(slug)) {
        slug = `${baseSlug}-${suffix}`;
        suffix += 1;
      }

      usedSlugs.add(slug);

      const [subtopic] = await tx
        .insert(subtopics)
        .values({
          topicId,
          title: item.title.trim(),
          slug,
          subtopicNumber: nextNumber,
          description: item.description?.trim() || undefined,
          status: item.status,
        })
        .returning();

      created.push(subtopic);

      nextNumber += 1;
    }

    return created;
  });
}