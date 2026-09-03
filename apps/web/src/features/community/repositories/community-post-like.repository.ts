import { and, count, eq, sql } from "drizzle-orm";

import {
  communityPostLikes,
  communityPosts,
  db,
} from "@mediverse/database";

export async function getCommunityPostLikeRepository(
  postId: string,
  userId: string,
) {
  const [like] = await db
    .select({
      id: communityPostLikes.id,
    })
    .from(communityPostLikes)
    .where(
      and(
        eq(
          communityPostLikes.postId,
          postId,
        ),
        eq(
          communityPostLikes.userId,
          userId,
        ),
      ),
    )
    .limit(1);

  return like ?? null;
}

export async function createCommunityPostLikeRepository(
  postId: string,
  userId: string,
) {
  const [like] = await db
    .insert(communityPostLikes)
    .values({
      postId,
      userId,
    })
    .returning();

  return like;
}

export async function deleteCommunityPostLikeRepository(
  postId: string,
  userId: string,
) {
  const [like] = await db
    .delete(communityPostLikes)
    .where(
      and(
        eq(
          communityPostLikes.postId,
          postId,
        ),
        eq(
          communityPostLikes.userId,
          userId,
        ),
      ),
    )
    .returning();

  return like ?? null;
}

export async function getCommunityPostLikeCountRepository(
  postId: string,
) {
  const [result] = await db
    .select({
      count: count(communityPostLikes.id),
    })
    .from(communityPostLikes)
    .where(
      eq(
        communityPostLikes.postId,
        postId,
      ),
    );

  return result?.count ?? 0;
}

export async function getCommunityPostLikeCountByAuthorRepository(
  authorId: string,
) {
  const result = await db
    .select({
      count: sql<number>`count(*)`,
    })
    .from(communityPostLikes)
    .innerJoin(
      communityPosts,
      eq(
        communityPostLikes.postId,
        communityPosts.id,
      ),
    )
    .where(
      eq(
        communityPosts.authorId,
        authorId,
      ),
    );

  return Number(result[0]?.count ?? 0);
}