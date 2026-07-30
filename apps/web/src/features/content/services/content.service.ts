import {
  createContentRepository,
  deleteContentRepository,
  getContentBySlugRepository,
  getContentsBySubtopicRepository,
  getContentsRepository,
  searchContentsRepository,
  updateContentRepository,
} from "../repositories";

import type { CreateContentInput } from "../validations";

export async function createContentService(
  data: CreateContentInput
) {
  return createContentRepository(data);
}

export async function getContentsService() {
  return getContentsRepository();
}

export async function getContentsBySubtopicService(
  subtopicId: string
) {
  return getContentsBySubtopicRepository(subtopicId);
}

export async function getContentBySlugService(
  slug: string
) {
  return getContentBySlugRepository(slug);
}

export async function updateContentService(
  id: string,
  data: CreateContentInput
) {
  return updateContentRepository(id, data);
}

export async function deleteContentService(
  id: string
) {
  return deleteContentRepository(id);
}

export async function searchContentsService(
    search: string
) {
    return searchContentsRepository(search);
}