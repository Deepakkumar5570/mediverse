import { db, units } from "@mediverse/database";
import { eq } from "drizzle-orm";

import type { CreateUnitInput } from "../validations";

export async function createUnitRepository(
  data: CreateUnitInput
) {
  const [unit] = await db
    .insert(units)
    .values(data)
    .returning();

  return unit;
}

export async function getUnitsRepository() {
  return db
    .select()
    .from(units);
}

export async function getUnitsBySubjectRepository(
  subjectId: string
) {
  return db
    .select()
    .from(units)
    .where(eq(units.subjectId, subjectId));
}