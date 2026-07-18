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
  data: CreateProgramInput,
) {
  try {
    const result = await db
      .insert(programs)
      .values(data)
      .returning();

    return result[0];
  } catch (error: any) {
    console.error("========== DATABASE ERROR ==========");
    console.error("Name:", error?.name);
    console.error("Message:", error?.message);
    console.error("Code:", error?.code);
    console.error("Detail:", error?.detail);
    console.error("Constraint:", error?.constraint);
    console.error("Column:", error?.column);
    console.error("Table:", error?.table);
    console.error("Schema:", error?.schema);
    console.error(error);
    throw error;
  }
}