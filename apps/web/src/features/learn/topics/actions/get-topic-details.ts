"use server";

import { getTopicDetailsService } from "../services";

export async function getTopicDetailsAction(
    topicId: string
) {
    return getTopicDetailsService(topicId);
}