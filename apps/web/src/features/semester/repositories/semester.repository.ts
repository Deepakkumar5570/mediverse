import { db, semesters } from "@mediverse/database";
import { eq } from "drizzle-orm";

import type { CreateSemesterInput } from "../validations/semester.schema";

export async function createSemesterRepository(
  data: CreateSemesterInput
) {
  const [semester] = await db
    .insert(semesters)
    .values(data)
    .returning();

  return semester;
}

export async function getSemestersRepository() {
  return db
    .select()
    .from(semesters);
}

export async function getSemestersByProgramRepository(
  programId: string
) {
  return db
    .select()
    .from(semesters)
    .where(eq(semesters.programId, programId));
}