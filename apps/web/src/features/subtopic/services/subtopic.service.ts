import {
  createSubtopicRepository,
  getSubtopicByIdRepository,
  getSubtopicsByTopicRepository,
  getSubtopicsRepository,
  updateSubtopicRepository,
} from "../repositories";

import type { CreateSubtopicInput } from "../validations";

export async function createSubtopicService(
  data: CreateSubtopicInput,
) {
  return createSubtopicRepository(data);
}

export async function getSubtopicsService() {
  return getSubtopicsRepository();
}

export async function getSubtopicByIdService(
  id: string,
) {
  return getSubtopicByIdRepository(id);
}

export async function getSubtopicsByTopicService(
  topicId: string,
) {
  return getSubtopicsByTopicRepository(topicId);
}

export async function updateSubtopicService(
  id: string,
  data: CreateSubtopicInput,
) {
  return updateSubtopicRepository(id, data);
}