import { db, topics } from "@mediverse/database";
import { asc, eq, max } from "drizzle-orm";

import type {
  CreateTopicInput,
} from "../validations";


/**
 * Create a single topic.
 */
export async function createTopicRepository(
  data: CreateTopicInput,
) {
  const [topic] = await db
    .insert(topics)
    .values(data)
    .returning();

  return topic;
}


/**
 * Get all topics.
 */
export async function getTopicsRepository() {
  return db
    .select()
    .from(topics)
    .orderBy(asc(topics.topicNumber));
}


/**
 * Get topic by ID.
 */
export async function getTopicByIdRepository(
  id: string,
) {
  const [topic] = await db
    .select()
    .from(topics)
    .where(eq(topics.id, id))
    .limit(1);

  return topic ?? null;
}


/**
 * Get all topics belonging to a unit.
 */
export async function getTopicsByUnitRepository(
  unitId: string,
) {
  return db
    .select()
    .from(topics)
    .where(eq(topics.unitId, unitId))
    .orderBy(asc(topics.topicNumber));
}


/**
 * Update a topic.
 */
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


/**
 * Create multiple topics for one unit.
 *
 * Responsibilities:
 * - Automatically continue topic numbering
 * - Generate slugs
 * - Prevent duplicate slugs
 * - Insert everything inside one transaction
 */
export async function createTopicsRepository(
  unitId: string,
  items: Array<{
    title: string;
    description?: string;
    status: "active" | "inactive";
  }>,
) {
  return db.transaction(async (tx) => {
    /**
     * Find the current highest topic number
     * for this unit.
     */
    const [maxResult] = await tx
      .select({
        value: max(topics.topicNumber),
      })
      .from(topics)
      .where(eq(topics.unitId, unitId));

    let nextNumber =
      Number(maxResult?.value ?? 0) + 1;


    /**
     * Collect all existing slugs.
     *
     * This makes generated slugs unique.
     */
    const usedSlugs = new Set<string>();

    const existingSlugs = await tx
      .select({
        slug: topics.slug,
      })
      .from(topics);

    for (const topic of existingSlugs) {
      usedSlugs.add(topic.slug);
    }


    const created = [];


    /**
     * Insert topics one by one inside
     * the same transaction.
     */
    for (const item of items) {
      /**
       * Generate base slug from title.
       */
      const baseSlug =
        item.title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .replace(/^-|-$/g, "") ||
        `topic-${nextNumber}`;


      /**
       * Resolve duplicate slug.
       *
       * Example:
       * anatomy
       * anatomy-2
       * anatomy-3
       */
      let slug = baseSlug;
      let suffix = 2;

      while (usedSlugs.has(slug)) {
        slug = `${baseSlug}-${suffix}`;
        suffix += 1;
      }

      usedSlugs.add(slug);


      /**
       * Insert topic.
       */
      const [topic] = await tx
        .insert(topics)
        .values({
          unitId,

          title: item.title.trim(),

          slug,

          topicNumber: nextNumber,

          description:
            item.description?.trim() ||
            undefined,

          status: item.status,
        })
        .returning();


      created.push(topic);

      nextNumber += 1;
    }


    return created;
  });
}