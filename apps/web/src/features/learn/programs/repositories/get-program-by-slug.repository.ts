import { eq } from "drizzle-orm";

import {
  db,
  programs,
} from "@mediverse/database";

export async function getProgramBySlugRepository(
  slug: string
) {
  const [program] = await db
    .select()
    .from(programs)
    .where(eq(programs.slug, slug));

  return program ?? null;
}