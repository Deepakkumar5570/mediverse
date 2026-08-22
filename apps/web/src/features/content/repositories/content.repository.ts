import {
  contents,
  db,
  programs,
  semesters,
  subjects,
  subtopics,
  topics,
  units,
} from "@mediverse/database";

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



export async function getContentStatsRepository() {
  const [result] = await db
    .select({
      total: sql<number>`count(*)`,
      active: sql<number>`
        count(*) filter (
          where ${contents.status} = 'active'
        )
      `,
      draft: sql<number>`
        count(*) filter (
          where ${contents.status} = 'draft'
        )
      `,
      archived: sql<number>`
        count(*) filter (
          where ${contents.status} = 'archived'
        )
      `,
    })
    .from(contents);

  return {
    total: Number(result.total),
    active: Number(result.active),
    draft: Number(result.draft),
    archived: Number(result.archived),
  };
}



export async function getPaginatedContentsWithHierarchyRepository(
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
    conditions.push(
      eq(contents.status, status)
    );
  }

  const whereClause =
    conditions.length > 0
      ? and(...conditions)
      : undefined;

  const items = await db
    .select({
      content: contents,

      subtopic: subtopics,

      topic: topics,

      unit: units,

      subject: subjects,

      semester: semesters,

      program: programs,
    })
    .from(contents)

    .innerJoin(
      subtopics,
      eq(
        contents.subtopicId,
        subtopics.id
      )
    )

    .innerJoin(
      topics,
      eq(
        subtopics.topicId,
        topics.id
      )
    )

    .innerJoin(
      units,
      eq(
        topics.unitId,
        units.id
      )
    )

    .innerJoin(
      subjects,
      eq(
        units.subjectId,
        subjects.id
      )
    )

    .innerJoin(
      semesters,
      eq(
        subjects.semesterId,
        semesters.id
      )
    )

    .innerJoin(
      programs,
      eq(
        semesters.programId,
        programs.id
      )
    )

    .where(whereClause)

    .orderBy(
      desc(contents.createdAt)
    )

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
    totalPages: Math.ceil(
      total / limit
    ),
  };
}



export async function getContentByIdWithHierarchyRepository(
  id: string
) {
  const [result] = await db
    .select({
      content: contents,

      subtopic: subtopics,

      topic: topics,

      unit: units,

      subject: subjects,

      semester: semesters,

      program: programs,
    })
    .from(contents)

    .innerJoin(
      subtopics,
      eq(
        contents.subtopicId,
        subtopics.id
      )
    )

    .innerJoin(
      topics,
      eq(
        subtopics.topicId,
        topics.id
      )
    )

    .innerJoin(
      units,
      eq(
        topics.unitId,
        units.id
      )
    )

    .innerJoin(
      subjects,
      eq(
        units.subjectId,
        subjects.id
      )
    )

    .innerJoin(
      semesters,
      eq(
        subjects.semesterId,
        semesters.id
      )
    )

    .innerJoin(
      programs,
      eq(
        semesters.programId,
        programs.id
      )
    )

    .where(
      eq(contents.id, id)
    )
    .limit(1);

  return result ?? null;
}