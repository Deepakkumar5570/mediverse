"use server";

import {
  getTopicsByUnitService,
  getTopicsService,
} from "../services";

export async function getTopicsAction() {
  return getTopicsService();
}

export async function getTopicsByUnitAction(
  unitId: string
) {
  return getTopicsByUnitService(unitId);
}