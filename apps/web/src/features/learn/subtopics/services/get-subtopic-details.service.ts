import { getSubtopicDetailsRepository } from "../repositories";

export async function getSubtopicDetailsService(
    subtopicId: string
) {
    const result =
        await getSubtopicDetailsRepository(
            subtopicId
        );

    if (!result) {
        throw new Error("Subtopic not found");
    }

    return result;
}