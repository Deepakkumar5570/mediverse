import { getContentBySubtopicRepository } from "../repositories";

export async function getContentBySubtopicService(
  subtopicId: string,
) {
  return getContentBySubtopicRepository(
    subtopicId,
  );
}