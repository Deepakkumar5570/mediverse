import {
  createTopicRepository,
  getTopicByIdRepository,
  getTopicsByUnitRepository,
  getTopicsRepository,
  updateTopicRepository,
} from "../repositories";

import type { CreateTopicInput } from "../validations";

export async function createTopicService(
  data: CreateTopicInput
) {
  return createTopicRepository(data);
}

export async function getTopicsService() {
  return getTopicsRepository();
}

export async function getTopicByIdService(
  id: string
) {
  return getTopicByIdRepository(id);
}

export async function getTopicsByUnitService(
  unitId: string
) {
  return getTopicsByUnitRepository(unitId);
}



export async function updateTopicService(
  id: string,
  data: CreateTopicInput,
) {
  return updateTopicRepository(id, data);
}