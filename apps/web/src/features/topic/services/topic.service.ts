import {
  createTopicRepository,
  createTopicsRepository,
  getTopicByIdRepository,
  getTopicsByUnitRepository,
  getTopicsRepository,
  updateTopicRepository,
} from "../repositories";

import type {
  CreateTopicInput,
  CreateTopicsInput,
} from "../validations";


/**
 * Create a single topic.
 */
export async function createTopicService(
  data: CreateTopicInput,
) {
  return createTopicRepository(data);
}


/**
 * Create multiple topics for one unit.
 */
export async function createTopicsService(
  data: CreateTopicsInput,
) {
  return createTopicsRepository(
    data.unitId,
    data.topics,
  );
}


/**
 * Get all topics.
 */
export async function getTopicsService() {
  return getTopicsRepository();
}


/**
 * Get topic by ID.
 */
export async function getTopicByIdService(
  id: string,
) {
  return getTopicByIdRepository(id);
}


/**
 * Get topics belonging to a unit.
 */
export async function getTopicsByUnitService(
  unitId: string,
) {
  return getTopicsByUnitRepository(unitId);
}


/**
 * Update a topic.
 */
export async function updateTopicService(
  id: string,
  data: CreateTopicInput,
) {
  return updateTopicRepository(id, data);
}