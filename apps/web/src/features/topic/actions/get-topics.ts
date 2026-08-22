"use server";

import {
  getTopicByIdService,
  getTopicsByUnitService,
  getTopicsService,
} from "../services";

export async function getTopicsAction() {
  return getTopicsService();
}

export async function getTopicByIdAction(
  id: string
) {
  return getTopicByIdService(id);
}

export async function getTopicsByUnitAction(
  unitId: string
) {
  return getTopicsByUnitService(unitId);
}