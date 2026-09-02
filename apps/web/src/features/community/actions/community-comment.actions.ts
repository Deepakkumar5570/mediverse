"use server";

import { revalidatePath } from "next/cache";

import { requireUserId } from "@/src/lib/auth/require-user-id";

import {
  createCommunityCommentService,
  getCommunityCommentsByPostService,
  getCommunityCommentByIdService,
  updateCommunityCommentService,
  deleteCommunityCommentService,
} from "../services";

type CreateCommunityCommentInput = {
  postId: string;
  content: string;
};

export async function createCommunityCommentAction(
  input: CreateCommunityCommentInput,
) {
  const userId = await requireUserId();

  const comment = await createCommunityCommentService({
    postId: input.postId,
    authorId: userId,
    content: input.content,
  });

  revalidatePath(`/learn/community/${input.postId}`);

  return comment;
}

export async function getCommunityCommentsAction(
  postId: string,
) {
  return getCommunityCommentsByPostService(postId);
}

export async function getCommunityCommentByIdAction(
  commentId: string,
) {
  return getCommunityCommentByIdService(commentId);
}

type UpdateCommunityCommentInput = {
  commentId: string;
  content: string;
};

export async function updateCommunityCommentAction(
  input: UpdateCommunityCommentInput,
) {
  const userId = await requireUserId();

  const comment =
    await updateCommunityCommentService(
      input.commentId,
      userId,
      {
        content: input.content,
      },
    );

  revalidatePath(
    `/learn/community/${comment.postId}`,
  );

  return comment;
}

export async function deleteCommunityCommentAction(
  commentId: string,
) {
  const userId = await requireUserId();

  const comment =
    await deleteCommunityCommentService(
      commentId,
      userId,
    );

  revalidatePath(
    `/learn/community/${comment.postId}`,
  );

  return comment;
}