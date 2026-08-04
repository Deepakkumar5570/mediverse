import { getTopicDetailsRepository } from "../repositories";

export async function getTopicDetailsService(
    topicId: string
) {
    const result =
        await getTopicDetailsRepository(topicId);

    if (!result) {
        throw new Error("Topic not found");
    }

    return result;
}