import { getLessonNavigationRepository } from "../repositories";

export async function getLessonNavigationService(
  currentSubtopicId: string,
) {
  return await getLessonNavigationRepository(
    currentSubtopicId,
  );
}