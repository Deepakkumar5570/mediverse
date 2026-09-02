import { desc, eq } from "drizzle-orm";

import {
  communityComments,
  db,
} from "@mediverse/database";

export async function createCommunityCommentRepository(
  data: typeof communityComments.$inferInsert,
) {
  const [comment] = await db
    .insert(communityComments)
    .values(data)
    .returning();

  return comment;
}

export async function getCommunityCommentsByPostRepository(
  postId: string,
) {
  return db
    .select()
    .from(communityComments)
    .where(eq(communityComments.postId, postId))
    .orderBy(desc(communityComments.createdAt));
}

export async function getCommunityCommentByIdRepository(
  commentId: string,
) {
  const [comment] = await db
    .select()
    .from(communityComments)
    .where(eq(communityComments.id, commentId))
    .limit(1);

  return comment ?? null;
}