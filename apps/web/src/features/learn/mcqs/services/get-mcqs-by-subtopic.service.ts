import {
  getMcqsBySubtopicRepository,
} from "../repositories";

export async function getMcqsBySubtopicService(
  subtopicId: string,
) {
  return getMcqsBySubtopicRepository(subtopicId);
}