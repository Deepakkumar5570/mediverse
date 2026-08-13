import {
    getFlashcardsByContentRepository,
} from "../repositories";

export async function getFlashcardsByContentService(
    contentId: string,
) {
    return getFlashcardsByContentRepository(contentId);
}