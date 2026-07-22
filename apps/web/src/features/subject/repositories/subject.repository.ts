import { db, subjects } from "@mediverse/database";
import { eq } from "drizzle-orm";

import type { CreateSubjectInput } from "../validations/subject.schema";

export async function createSubjectRepository(
  data: CreateSubjectInput
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

export async function getSubjectsBySemesterRepository(
  semesterId: string
) {
  return db
    .select()
    .from(subjects)
    .where(eq(subjects.semesterId, semesterId));
}