import { and, count, eq, sql } from "drizzle-orm";

import {
  communityCommentLikes,
  communityComments,
  db,
} from "@mediverse/database";

export async function getCommunityCommentLikeRepository(
  commentId: string,
  userId: string,
) {
  const [like] = await db
    .select({
      id: communityCommentLikes.id,
    })
    .from(communityCommentLikes)
    .where(
      and(
        eq(
          communityCommentLikes.commentId,
          commentId,
        ),
        eq(
          communityCommentLikes.userId,
          userId,
        ),
      ),
    )
    .limit(1);

  return like ?? null;
}

export async function createCommunityCommentLikeRepository(
  commentId: string,
  userId: string,
) {
  const [like] = await db
    .insert(communityCommentLikes)
    .values({
      commentId,
      userId,
    })
    .returning();

  return like;
}

export async function deleteCommunityCommentLikeRepository(
  commentId: string,
  userId: string,
) {
  const [like] = await db
    .delete(communityCommentLikes)
    .where(
      and(
        eq(
          communityCommentLikes.commentId,
          commentId,
        ),
        eq(
          communityCommentLikes.userId,
          userId,
        ),
      ),
    )
    .returning();

  return like ?? null;
}

export async function getCommunityCommentLikeCountRepository(
  commentId: string,
) {
  const [result] = await db
    .select({
      count: count(communityCommentLikes.id),
    })
    .from(communityCommentLikes)
    .where(
      eq(
        communityCommentLikes.commentId,
        commentId,
      ),
    );

  return result?.count ?? 0;
}

export async function getCommunityCommentLikeCountByAuthorRepository(
  authorId: string,
) {
  const result = await db
    .select({
      count: sql<number>`count(*)`,
    })
    .from(communityCommentLikes)
    .innerJoin(
      communityComments,
      eq(
        communityCommentLikes.commentId,
        communityComments.id,
      ),
    )
    .where(
      eq(
        communityComments.authorId,
        authorId,
      ),
    );

  return Number(result[0]?.count ?? 0);
}