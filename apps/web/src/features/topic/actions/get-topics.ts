"use server";

import {
  getTopicByIdService,
  getTopicBySlugService,
  getTopicsByUnitService,
  getTopicsService,
} from "../services";

export async function getTopicsAction() {
  return getTopicsService();
}

export async function getTopicByIdAction(
  id: string,
) {
  return getTopicByIdService(id);
}

export async function getTopicBySlugAction(
  slug: string,
) {
  return getTopicBySlugService(slug);
}

export async function getTopicsByUnitAction(
  unitId: string,
) {
  return getTopicsByUnitService(unitId);
}