"use server";

import { requireUserId } from "@/src/lib/auth/require-user-id";

import {
  getGamificationService,
} from "../points/xp.service";

export async function getGamificationStatsAction() {
  const userId =
    await requireUserId();

  return getGamificationService(
    userId,
  );
}