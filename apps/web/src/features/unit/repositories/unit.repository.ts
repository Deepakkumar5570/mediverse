import { db, units } from "@mediverse/database";
import {
  asc,
  eq,
  max,
} from "drizzle-orm";

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

export async function createUnitsRepository(
  subjectId: string,
  items: Array<{
    title: string;
    description?: string;
    status: "active" | "inactive";
  }>,
) {
  return db.transaction(async (tx) => {
    /**
     * Continue numbering from the
     * highest existing unit number.
     */
    const [maxResult] = await tx
      .select({
        value: max(units.unitNumber),
      })
      .from(units)
      .where(
        eq(units.subjectId, subjectId),
      );

    let nextNumber =
      Number(maxResult?.value ?? 0) + 1;


    /**
     * Collect existing slugs.
     */
    const usedSlugs = new Set<string>();

    const existingSlugs = await tx
      .select({
        slug: units.slug,
      })
      .from(units);

    for (const unit of existingSlugs) {
      usedSlugs.add(unit.slug);
    }


    const created = [];


    /**
     * Create every unit inside the
     * same transaction.
     */
    for (const item of items) {
      const baseSlug =
        item.title
          .toLowerCase()
          .trim()
          .replace(
            /[^a-z0-9\s-]/g,
            "",
          )
          .replace(
            /\s+/g,
            "-",
          )
          .replace(
            /-+/g,
            "-",
          )
          .replace(
            /^-|-$/g,
            "",
          ) ||
        `unit-${nextNumber}`;


      let slug = baseSlug;
      let suffix = 2;


      while (usedSlugs.has(slug)) {
        slug =
          `${baseSlug}-${suffix}`;

        suffix += 1;
      }


      usedSlugs.add(slug);


      const [unit] = await tx
        .insert(units)
        .values({
          subjectId,

          title:
            item.title.trim(),

          slug,

          unitNumber:
            nextNumber,

          description:
            item.description?.trim() ||
            undefined,

          status:
            item.status,
        })
        .returning();


      created.push(unit);

      nextNumber += 1;
    }


    return created;
  });
}