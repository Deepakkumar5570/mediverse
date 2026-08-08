import { createContentRepository } from "../repositories";

type CreateContentInput = {
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

export async function createContentService(
  input: CreateContentInput,
) {
  return createContentRepository(input);
}