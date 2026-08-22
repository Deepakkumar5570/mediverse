import { db, subjects } from "@mediverse/database";
import { and, eq, ne } from "drizzle-orm";

import type { CreateSubjectInput } from "../validations/subject.schema";

export async function createSubjectRepository(
  data: CreateSubjectInput,
) {
  const [subject] = await db
    .insert(subjects)
    .values(data)
    .returning();

  return subject;
}

export async function getSubjectsRepository() {
  return db
    .select()
    .from(subjects);
}

export async function getSubjectByIdRepository(
  id: string,
) {
  const [subject] = await db
    .select()
    .from(subjects)
    .where(eq(subjects.id, id))
    .limit(1);

  return subject ?? null;
}

export async function getSubjectBySlugRepository(
  slug: string,
) {
  const [subject] = await db
    .select()
    .from(subjects)
    .where(eq(subjects.slug, slug))
    .limit(1);

  return subject ?? null;
}

export async function getSubjectsBySemesterRepository(
  semesterId: string,
) {
  return db
    .select()
    .from(subjects)
    .where(eq(subjects.semesterId, semesterId));
}

export async function updateSubjectRepository(
  id: string,
  data: CreateSubjectInput,
) {
  const [subject] = await db
    .update(subjects)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(subjects.id, id))
    .returning();

  return subject ?? null;
}