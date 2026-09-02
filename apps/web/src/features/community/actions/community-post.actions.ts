"use server";

import { revalidatePath } from "next/cache";

import { requireUserId } from "@/src/lib/auth/require-user-id";

import {
  createCommunityPostService,
  getCommunityPostsService,
  getCommunityPostByIdService,
  getCommunityPostsByAuthorService,
  updateCommunityPostService,
} from "../services";

import {
  updateCommunityPostSchema,
} from "../validations";

type CreateCommunityPostInput = {
  title: string;
  content: string;
  category?: string;
};

export async function createCommunityPostAction(
  input: CreateCommunityPostInput,
) {
  const userId = await requireUserId();

  const post = await createCommunityPostService({
    ...input,
    authorId: userId,
    status: "published",
  });

  revalidatePath("/learn/community");

  return post;
}

export async function getCommunityPostsAction() {
  return getCommunityPostsService();
}

export async function getCommunityPostByIdAction(
  postId: string,
) {
  return getCommunityPostByIdService(postId);
}

export async function getMyCommunityPostsAction() {
  const userId = await requireUserId();

  return getCommunityPostsByAuthorService(userId);
}



export async function updateCommunityPostAction(
  postId: string,
  input: unknown,
) {
  const userId = await requireUserId();

  const data =
    updateCommunityPostSchema.parse(input);

  const post = await updateCommunityPostService(
    postId,
    userId,
    data,
  );

  if (!post) {
    throw new Error(
      "Post not found or you are not allowed to edit this post.",
    );
  }

  revalidatePath("/learn/community");
  revalidatePath(`/learn/community/${postId}`);

  return post;
}