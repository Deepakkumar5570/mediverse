import {
  createProfileRepository,
  getProfileRepository,
  updateProfileRepository,
} from "../repositories/profile.repository";

export async function getOrCreateProfileService(userId: string) {
  const existing = await getProfileRepository(userId);

  if (existing) {
    return existing;
  }

  await createProfileRepository(userId);

  return getProfileRepository(userId);
}

export async function updateProfileService(
  userId: string,
  data: {
    username?: string | null;
    bio?: string | null;
    programId?: string | null;
    semesterId?: string | null;
  },
) {
  return updateProfileRepository(userId, data);
}