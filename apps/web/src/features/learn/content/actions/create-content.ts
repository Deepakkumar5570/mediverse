"use server";

import { createContentService } from "../services";

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

export async function createContentAction(
  input: CreateContentInput,
) {
  return createContentService(input);
}