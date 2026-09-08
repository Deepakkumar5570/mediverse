"use server";

import { requireUserId } from "@/src/lib/auth/require-user-id";
import { getOrCreateProfileService } from "../services/profile.service";

export async function getProfileAction() {
  const userId = await requireUserId();

  return getOrCreateProfileService(userId);
}