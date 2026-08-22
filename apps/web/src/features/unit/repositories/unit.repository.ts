import { db, units } from "@mediverse/database";
import { eq } from "drizzle-orm";

import type { CreateUnitInput } from "../validations";

export async function createUnitRepository(
  data: CreateUnitInput,
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

export async function getUnitByIdRepository(
  id: string,
) {
  const [unit] = await db
    .select()
    .from(units)
    .where(eq(units.id, id))
    .limit(1);

  return unit ?? null;
}

export async function getUnitBySlugRepository(
  slug: string,
) {
  const [unit] = await db
    .select()
    .from(units)
    .where(eq(units.slug, slug))
    .limit(1);

  return unit ?? null;
}

export async function getUnitsBySubjectRepository(
  subjectId: string,
) {
  return db
    .select()
    .from(units)
    .where(eq(units.subjectId, subjectId));
}

export async function updateUnitRepository(
  id: string,
  data: CreateUnitInput,
) {
  const [unit] = await db
    .update(units)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(units.id, id))
    .returning();

  return unit ?? null;
}