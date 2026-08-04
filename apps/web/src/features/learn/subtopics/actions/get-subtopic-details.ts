"use server";

import { getSubtopicDetailsService } from "../services";

export async function getSubtopicDetailsAction(
    subtopicId: string
) {
    return getSubtopicDetailsService(subtopicId);
}