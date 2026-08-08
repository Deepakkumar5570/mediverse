import { db } from "@mediverse/database";
import { contents } from "@mediverse/database";

type CreateContentRepositoryInput = {
  subtopicId: string;
  title: string;
  slug: string;
  summary?: string | null;
  content: string;
  readingTime: number;
  seoTitle?: string | null;
  seoDescription?: string | null;
  status: string;
};

export async function createContentRepository(
  input: CreateContentRepositoryInput,
) {
  const [createdContent] = await db
    .insert(contents)
    .values({
      subtopicId: input.subtopicId,
      title: input.title,
      slug: input.slug,
      summary: input.summary,
      content: input.content,
      readingTime: input.readingTime,
      seoTitle: input.seoTitle,
      seoDescription: input.seoDescription,
      status: input.status,
    })
    .returning();

  return createdContent;
}