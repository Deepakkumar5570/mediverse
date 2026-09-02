"use server";

import { revalidatePath } from "next/cache";

import { requireUserId } from "@/src/lib/auth/require-user-id";

import {
  getCommunityCommentLikeCountService,
  getCommunityCommentLikeStatusService,
  toggleCommunityCommentLikeService,
} from "../services";

export async function toggleCommunityCommentLikeAction(
  commentId: string,
  postId: string,
) {
  const userId = await requireUserId();

  const result =
    await toggleCommunityCommentLikeService(
      commentId,
      userId,
    );

  revalidatePath(`/learn/community/${postId}`);

  return result;
}

export async function getCommunityCommentLikeStatusAction(
  commentId: string,
) {
  const userId = await requireUserId();

  return getCommunityCommentLikeStatusService(
    commentId,
    userId,
  );
}

export async function getCommunityCommentLikeCountAction(
  commentId: string,
) {
  return getCommunityCommentLikeCountService(
    commentId,
  );
}