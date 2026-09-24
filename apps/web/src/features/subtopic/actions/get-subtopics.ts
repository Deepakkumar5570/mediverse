"use server";

import {
  getSubtopicByIdService,
  getSubtopicBySlugService,
  getSubtopicsByTopicService,
  getSubtopicsService,
} from "../services";

export async function getSubtopicsAction() {
  return getSubtopicsService();
}

export async function getSubtopicByIdAction(
  id: string,
) {
  return getSubtopicByIdService(id);
}

export async function getSubtopicBySlugAction(
  slug: string,
) {
  return getSubtopicBySlugService(slug);
}

export async function getSubtopicsByTopicAction(
  topicId: string,
) {
  return getSubtopicsByTopicService(topicId);
}