"use server";

import {
  getSubtopicByIdService,
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

export async function getSubtopicsByTopicAction(
  topicId: string,
) {
  return getSubtopicsByTopicService(topicId);
}