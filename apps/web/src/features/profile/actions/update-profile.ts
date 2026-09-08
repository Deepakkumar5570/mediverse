"use server";

import { requireUserId } from "@/src/lib/auth/require-user-id";
import { updateProfileService } from "../services/profile.service";

type UpdateProfileInput = {
  username?: string | null;
  bio?: string | null;
  programId?: string | null;
  semesterId?: string | null;
};

export async function updateProfileAction(
  data: UpdateProfileInput,
) {
  const userId = await requireUserId();

  return updateProfileService(userId, data);
}