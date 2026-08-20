// import {
//   getSubjectProgressRepository,
//   getSingleSubjectProgressRepository,
//   getSingleUnitProgressRepository,
// } from "../repositories/progress.repository";

// import {
//   getProgressByUserRepository,
//   getProgressByUserAndContentRepository,
//   getProgressSummaryRepository,
//   markContentCompleteRepository,
//   markContentIncompleteRepository,
//   getSubtopicProgressRepository,
// } from "../repositories/progress.repository";



import {
  getProgressByUserRepository,
  getProgressByUserAndContentRepository,
  getProgressSummaryRepository,
  getSubtopicProgressRepository,
  getSubjectProgressRepository,
  getSingleSubjectProgressRepository,
  getSingleUnitProgressRepository,
  getSingleTopicProgressRepository,
  getUnitProgressRepository,
  getRecentLearningActivityRepository,
  markContentCompleteRepository,
  markContentIncompleteRepository,
} from "../repositories/progress.repository";



export async function getSingleTopicProgressService(
  userId: string,
  topicId: string,
) {
  return getSingleTopicProgressRepository(
    userId,
    topicId,
  );
}


export async function getUnitProgressService(
  userId: string,
) {
  return getUnitProgressRepository(userId);
}

export async function getSubjectProgressService(
  userId: string,
) {
  return getSubjectProgressRepository(userId);
}



export async function getSingleSubjectProgressService(
  userId: string,
  subjectId: string,
) {
  return getSingleSubjectProgressRepository(
    userId,
    subjectId,
  );
}


export async function getSingleUnitProgressService(
  userId: string,
  unitId: string,
) {
  return getSingleUnitProgressRepository(
    userId,
    unitId,
  );
}


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



export async function getSubtopicProgressService(
  userId: string,
  subtopicId: string,
) {
  return getSubtopicProgressRepository(
    userId,
    subtopicId,
  );
}


export async function getRecentLearningActivityService(
  userId: string,
) {
  return getRecentLearningActivityRepository(userId);
}