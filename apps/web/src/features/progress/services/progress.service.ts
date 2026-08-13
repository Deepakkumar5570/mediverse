import {
  getProgressByUserRepository,
  getProgressByUserAndContentRepository,
  getProgressSummaryRepository,
  markContentCompleteRepository,
  markContentIncompleteRepository,
} from "../repositories/progress.repository";

export async function getUserProgressService(
    userId: string
) {
    return getProgressByUserRepository(userId);
}

export async function getContentProgressService(
    userId: string,
    contentId: string
) {
    return getProgressByUserAndContentRepository(
        userId,
        contentId
    );
}

export async function completeContentService(
    userId: string,
    contentId: string
) {
    return markContentCompleteRepository(
        userId,
        contentId
    );
}

export async function incompleteContentService(
    userId: string,
    contentId: string
) {
    return markContentIncompleteRepository(
        userId,
        contentId
    );
}



export async function getProgressSummaryService(
  userId: string,
) {
  return getProgressSummaryRepository(userId);
}