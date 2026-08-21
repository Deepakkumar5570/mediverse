import { db, semesters } from "@mediverse/database";
import { eq } from "drizzle-orm";

import type { CreateSemesterInput } from "../validations/semester.schema";

export async function createSemesterRepository(
  data: CreateSemesterInput,
) {
  const [semester] = await db
    .insert(semesters)
    .values(data)
    .returning();

  return semester;
}

export async function getSemestersRepository() {
  return db.select().from(semesters);
}

export async function getSemestersByProgramRepository(
  programId: string,
) {
  return db
    .select()
    .from(semesters)
    .where(eq(semesters.programId, programId));
}

export async function getSemesterByIdRepository(
  id: string,
) {
  const [semester] = await db
    .select()
    .from(semesters)
    .where(eq(semesters.id, id))
    .limit(1);

  return semester ?? null;
}

export async function updateSemesterRepository(
  id: string,
  data: CreateSemesterInput,
) {
  const [semester] = await db
    .update(semesters)
    .set(data)
    .where(eq(semesters.id, id))
    .returning();

  return semester ?? null;
}