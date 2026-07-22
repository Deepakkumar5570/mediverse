import {
  createTopicRepository,
  getTopicsByUnitRepository,
  getTopicsRepository,
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

export async function getTopicsByUnitService(
  unitId: string
) {
  return getTopicsByUnitRepository(unitId);
}