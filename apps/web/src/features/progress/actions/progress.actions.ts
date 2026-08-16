"use server";

import { auth } from "@clerk/nextjs/server";
import {
  completeContentService,
  getContentProgressService,
  getProgressSummaryService,
  getUserProgressService,
  incompleteContentService,
  getSubtopicProgressService,
  getSubjectProgressService,
} from "../services/progress.service";

async function requireUserId() {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    return userId;
}

export async function getUserProgressAction() {
    const userId = await requireUserId();

    return getUserProgressService(userId);
}

export async function getContentProgressAction(
    contentId: string
) {
    const userId = await requireUserId();

    return getContentProgressService(
        userId,
        contentId
    );
}

export async function completeContentAction(
    contentId: string
) {
    const userId = await requireUserId();

    return completeContentService(
        userId,
        contentId
    );
}

export async function incompleteContentAction(
    contentId: string
) {
    const userId = await requireUserId();

    return incompleteContentService(
        userId,
        contentId
    );
}


export async function getProgressSummaryAction() {
  const userId = await requireUserId();

  return getProgressSummaryService(userId);
}


export async function getSubtopicProgressAction(
  subtopicId: string,
) {
  const userId = await requireUserId();

  return getSubtopicProgressService(
    userId,
    subtopicId,
  );
}


export async function getSubjectProgressAction() {
  const userId = await requireUserId();

  return getSubjectProgressService(userId);
}