"use server";

import { getSubtopicByIdService } from "../services";

export async function getSubtopicByIdAction(
  id: string,
) {
  return getSubtopicByIdService(id);
}