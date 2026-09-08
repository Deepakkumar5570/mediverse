"use server";

import { requireUserId } from "@/src/lib/auth/require-user-id";

import {
  getActivityStatsService,
} from "../services/activity.service";

export async function getActivityStatsAction() {
  const userId = await requireUserId();

  return getActivityStatsService(userId);
}