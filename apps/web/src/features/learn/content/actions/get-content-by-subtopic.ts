"use server";

import { getContentBySubtopicService } from "../services";

export async function getContentBySubtopicAction(
  subtopicId: string,
) {
  return getContentBySubtopicService(
    subtopicId,
  );
}