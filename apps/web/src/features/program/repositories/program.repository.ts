import "server-only";

import { asc, eq } from "drizzle-orm";

import { db, programs } from "@mediverse/database";
import type { CreateProgramInput } from "../validations/program.schema";

export async function getProgramsRepository() {
  return db.select().from(programs).orderBy(asc(programs.name));
}

export async function getProgramBySlugRepository(slug: string) {
  const result = await db
    .select()
    .from(programs)
    .where(eq(programs.slug, slug))
    .limit(1);

  return result[0] ?? null;
}

export async function createProgramRepository(
  data: CreateProgramInput
) {
  const result = await db
    .insert(programs)
    .values(data)
    .returning();

  return result[0];
}