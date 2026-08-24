"use server";

import {
  getMcqsBySubtopicService,
} from "../services";

export async function getMcqsBySubtopicAction(
  subtopicId: string,
) {
  return getMcqsBySubtopicService(subtopicId);
}