import {
  getMcqsRepository,
  getMcqByIdRepository,
  getMcqsBySubtopicRepository,
} from "../repositories";

export async function getMcqsService() {
  return getMcqsRepository();
}

export async function getMcqByIdService(
  id: string,
) {
  return getMcqByIdRepository(id);
}

export async function getMcqsBySubtopicService(
  subtopicId: string,
) {
  return getMcqsBySubtopicRepository(
    subtopicId,
  );
}