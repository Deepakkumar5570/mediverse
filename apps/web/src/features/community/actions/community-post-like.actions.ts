"use server";

import { revalidatePath } from "next/cache";

import { requireUserId } from "@/src/lib/auth/require-user-id";

import {
  getCommunityPostLikeCountService,
  getCommunityPostLikeStatusService,
  toggleCommunityPostLikeService,
} from "../services";

export async function toggleCommunityPostLikeAction(
  postId: string,
) {
  const userId = await requireUserId();

  const result =
    await toggleCommunityPostLikeService(
      postId,
      userId,
    );

  revalidatePath(`/learn/community/${postId}`);
  revalidatePath("/learn/community");

  return result;
}

export async function getCommunityPostLikeStatusAction(
  postId: string,
) {
  const userId = await requireUserId();

  return getCommunityPostLikeStatusService(
    postId,
    userId,
  );
}

export async function getCommunityPostLikeCountAction(
  postId: string,
) {
  return getCommunityPostLikeCountService(postId);
}