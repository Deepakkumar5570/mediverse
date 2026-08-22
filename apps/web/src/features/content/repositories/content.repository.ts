import { db, contents } from "@mediverse/database";
import {
  and,
  asc,
  eq,
  ilike,
  or,
  sql,
  desc,
} from "drizzle-orm";

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


export async function searchContentsRepository(
  search: string,
  status?: "draft" | "active" | "archived"
) {
  const conditions = [
    or(
      ilike(contents.title, `%${search}%`),
      ilike(contents.slug, `%${search}%`)
    ),
  ];

  if (status) {
    conditions.push(eq(contents.status, status));
  }

  return db
    .select()
    .from(contents)
    .where(and(...conditions))
    .orderBy(desc(contents.createdAt));
}


//  "feat(content): add content search"

// export async function getPaginatedContentsRepository(
//   page: number,
//   limit: number
// ) {
//   const offset = (page - 1) * limit;

//   const items = await db
//     .select()
//     .from(contents)
//     .orderBy(desc(contents.createdAt))
//     .limit(limit)
//     .offset(offset);

//   const [{ count }] = await db
//     .select({
//       count: sql<number>`count(*)`,
//     })
//     .from(contents);

//   return {
//     items,
//     total: Number(count),
//     page,
//     limit,
//     totalPages: Math.ceil(Number(count) / limit),
//   };
// }




export async function getPaginatedContentsRepository(
  page: number,
  limit: number,
  search?: string,
  status?: "draft" | "active" | "archived"
) {
  const offset = (page - 1) * limit;

  const conditions = [];

  if (search?.trim()) {
    conditions.push(
      or(
        ilike(contents.title, `%${search.trim()}%`),
        ilike(contents.slug, `%${search.trim()}%`)
      )
    );
  }

  if (status) {
    conditions.push(eq(contents.status, status));
  }

  const whereClause =
    conditions.length > 0
      ? and(...conditions)
      : undefined;

  const items = await db
    .select()
    .from(contents)
    .where(whereClause)
    .orderBy(desc(contents.createdAt))
    .limit(limit)
    .offset(offset);

  const [{ count }] = await db
    .select({
      count: sql<number>`count(*)`,
    })
    .from(contents)
    .where(whereClause);

  const total = Number(count);

  return {
    items,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}


export async function getContentsByStatusRepository(
  status:
    | "draft"
    | "active"
    | "archived"
) {
  return db
    .select()
    .from(contents)
    .where(eq(contents.status, status))
    .orderBy(desc(contents.createdAt));
}