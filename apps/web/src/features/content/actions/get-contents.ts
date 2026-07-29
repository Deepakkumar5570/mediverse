"use server";

import {
  getContentBySlugService,
  getContentsBySubtopicService,
  getContentsService,
} from "../services";

export async function getContentsAction() {
  return getContentsService();
}

export async function getContentsBySubtopicAction(
  subtopicId: string
) {
  return getContentsBySubtopicService(subtopicId);
}

export async function getContentBySlugAction(
  slug: string
) {
  return getContentBySlugService(slug);
}