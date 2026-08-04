"use server";

import { getSubtopicsByTopicService } from "../services";

export async function getSubtopicsByTopicAction(
    topicId: string
) {
    return getSubtopicsByTopicService(topicId);
}