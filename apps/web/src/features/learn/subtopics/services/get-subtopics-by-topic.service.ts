import { getSubtopicsByTopicRepository } from "../repositories";

export async function getSubtopicsByTopicService(
    topicId: string
) {
    return getSubtopicsByTopicRepository(topicId);
}