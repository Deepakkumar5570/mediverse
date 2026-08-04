import { db } from "@mediverse/database";
import { contents } from "@mediverse/database";
import { eq, and } from "drizzle-orm";

export async function getContentBySubtopicRepository(
  subtopicId: string,
) {
  const [content] = await db
    .select()
    .from(contents)
    .where(
      and(
        eq(contents.subtopicId, subtopicId),
        eq(contents.status, "active"),
      ),
    )
    .limit(1);

  return content ?? null;
}