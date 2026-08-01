"use server";

import { getContentsByStatusService } from "../services";

export async function getContentsByStatusAction(
  status: "draft" | "active" | "archived"
) {
  return getContentsByStatusService(status);
}