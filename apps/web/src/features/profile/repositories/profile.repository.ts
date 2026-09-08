import {
  db,
  programs,
  semesters,
  userProfiles,
} from "@mediverse/database";

import { eq } from "drizzle-orm";

export async function getProfileRepository(userId: string) {
  const [profile] = await db
    .select({
      id: userProfiles.id,
      userId: userProfiles.userId,
      username: userProfiles.username,
      bio: userProfiles.bio,
      programId: userProfiles.programId,
      semesterId: userProfiles.semesterId,
      profileVisibility: userProfiles.profileVisibility,
      programName: programs.name,
      semesterName: semesters.name,
      createdAt: userProfiles.createdAt,
    })
    .from(userProfiles)
    .leftJoin(programs, eq(userProfiles.programId, programs.id))
    .leftJoin(semesters, eq(userProfiles.semesterId, semesters.id))
    .where(eq(userProfiles.userId, userId))
    .limit(1);

  return profile ?? null;
}

export async function createProfileRepository(userId: string) {
  const [profile] = await db
    .insert(userProfiles)
    .values({
      userId,
    })
    .returning();

  return profile;
}

export async function updateProfileRepository(
  userId: string,
  data: {
    username?: string | null;
    bio?: string | null;
    programId?: string | null;
    semesterId?: string | null;
  },
) {
  const [profile] = await db
    .update(userProfiles)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(userProfiles.userId, userId))
    .returning();

  return profile;
}