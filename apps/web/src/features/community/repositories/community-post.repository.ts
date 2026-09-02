import { desc, eq, and } from "drizzle-orm";

import {
  db,
  communityPosts,
} from "@mediverse/database";

type CreateCommunityPostInput = {
  authorId: string;
  title: string;
  content: string;
  category?: string;
  status?: string;
};

export async function createCommunityPostRepository(
  input: CreateCommunityPostInput,
) {
  const [post] = await db
    .insert(communityPosts)
    .values({
      authorId: input.authorId,
      title: input.title,
      content: input.content,
      category: input.category ?? "general",
      status: input.status ?? "published",
    })
    .returning();

  return post;
}

export async function getCommunityPostsRepository() {
  return db
    .select()
    .from(communityPosts)
    .where(eq(communityPosts.status, "published"))
    .orderBy(desc(communityPosts.createdAt));
}

export async function getCommunityPostByIdRepository(
  postId: string,
) {
  const [post] = await db
    .select()
    .from(communityPosts)
    .where(eq(communityPosts.id, postId))
    .limit(1);

  return post ?? null;
}

export async function getCommunityPostsByAuthorRepository(
  authorId: string,
) {
  return db
    .select()
    .from(communityPosts)
    .where(eq(communityPosts.authorId, authorId))
    .orderBy(desc(communityPosts.createdAt));
}


type UpdateCommunityPostInput = {
  title: string;
  content: string;
  category: string;
};

export async function updateCommunityPostRepository(
  postId: string,
  authorId: string,
  input: UpdateCommunityPostInput,
) {
  const [post] = await db
    .update(communityPosts)
    .set({
      title: input.title,
      content: input.content,
      category: input.category,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(communityPosts.id, postId),
        eq(communityPosts.authorId, authorId),
      ),
    )
    .returning();

  return post ?? null;
}