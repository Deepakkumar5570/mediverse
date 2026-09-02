"use server";

import { revalidatePath } from "next/cache";

import { requireUserId } from "@/src/lib/auth/require-user-id";

import {
  createCommunityPostService,
  getCommunityPostsService,
  getCommunityPostByIdService,
  getCommunityPostsByAuthorService,
} from "../services";

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