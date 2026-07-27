import {
  createSubtopicRepository,
  getSubtopicsByTopicRepository,
  getSubtopicsRepository,
} from "../repositories";

import type { CreateSubtopicInput } from "../validations";

export async function createSubtopicService(
  data: CreateSubtopicInput
) {
  return createSubtopicRepository(data);
}

export async function getSubtopicsService() {
  return getSubtopicsRepository();
}

export async function getSubtopicsByTopicService(
  topicId: string
) {
  return getSubtopicsByTopicRepository(topicId);
}