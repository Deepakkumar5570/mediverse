"use server";

import { getLessonNavigationService } from "../services";

export async function getLessonNavigationAction(
  currentSubtopicId: string,
) {
  return await getLessonNavigationService(
    currentSubtopicId,
  );
}