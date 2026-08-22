"use server";

import { getContentStatsService } from "../services";

export async function getContentStatsAction() {
  return getContentStatsService();
}