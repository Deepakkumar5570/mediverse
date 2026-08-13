"use server";

import {
    getFlashcardsByContentService,
} from "../services";

export async function getFlashcardsByContentAction(
    contentId: string,
) {
    return getFlashcardsByContentService(contentId);
}