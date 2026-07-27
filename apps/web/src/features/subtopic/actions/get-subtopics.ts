"use server";

import {
  getSubtopicsByTopicService,
  getSubtopicsService,
} from "../services";

export async function getSubtopicsAction() {
  return getSubtopicsService();
}

export async function getSubtopicsByTopicAction(
  topicId: string
) {
  return getSubtopicsByTopicService(topicId);
}