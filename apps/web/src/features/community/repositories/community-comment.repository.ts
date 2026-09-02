import { desc, eq, and } from "drizzle-orm";

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

type UpdateCommunityCommentInput = {
  content: string;
};

export async function updateCommunityCommentRepository(
  commentId: string,
  authorId: string,
  input: UpdateCommunityCommentInput,
) {
  const [comment] = await db
    .update(communityComments)
    .set({
      content: input.content,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(communityComments.id, commentId),
        eq(communityComments.authorId, authorId),
      ),
    )
    .returning();

  return comment ?? null;
}

export async function deleteCommunityCommentRepository(
  commentId: string,
  authorId: string,
) {
  const [comment] = await db
    .delete(communityComments)
    .where(
      and(
        eq(communityComments.id, commentId),
        eq(communityComments.authorId, authorId),
      ),
    )
    .returning();

  return comment ?? null;
}