"use server";

import { auth } from "@clerk/nextjs/server";

import { requireUserId } from "@/src/lib/auth/require-user-id";

import {
    completeContentService,
    getContentProgressService,
    getProgressSummaryService,
    getUserProgressService,
    incompleteContentService,
    getSubtopicProgressService,
    getSubjectProgressService,
    getSingleSubjectProgressService,
    getSingleUnitProgressService,
    getContinueLearningService,
    getRecentLearningActivityService,
    getSingleTopicProgressService,
    getUnitProgressService,
} from "../services/progress.service";

async function getOptionalUserId() {
    const { userId } = await auth();

    return userId;
}

/* =========================================================
   PUBLIC LEARNING PAGES
   ========================================================= */

export async function getSingleTopicProgressAction(
    topicId: string,
) {
    const userId = await getOptionalUserId();

    if (!userId) {
        return {
            total: 0,
            completed: 0,
            percentage: 0,
        };
    }

    return getSingleTopicProgressService(
        userId,
        topicId,
    );
}

export async function getSingleUnitProgressAction(
    unitId: string,
) {
    const userId = await getOptionalUserId();

    if (!userId) {
        return {
            total: 0,
            completed: 0,
            percentage: 0,
        };
    }

    return getSingleUnitProgressService(
        userId,
        unitId,
    );
}

export async function getSubtopicProgressAction(
    subtopicId: string,
) {
    const userId = await getOptionalUserId();

    if (!userId) {
        return {
            total: 0,
            completed: 0,
            percentage: 0,
        };
    }

    return getSubtopicProgressService(
        userId,
        subtopicId,
    );
}

export async function getContentProgressAction(
    contentId: string,
) {
    const userId = await getOptionalUserId();

    if (!userId) {
        return null;
    }

    return getContentProgressService(
        userId,
        contentId,
    );
}

/* =========================================================
   PROTECTED PROGRESS
   ========================================================= */

export async function getUnitProgressAction() {
    const userId = await requireUserId();

    return getUnitProgressService(userId);
}

export async function getUserProgressAction() {
    const userId = await requireUserId();

    return getUserProgressService(userId);
}

export async function getProgressSummaryAction() {
    const userId = await requireUserId();

    return getProgressSummaryService(userId);
}

export async function getSubjectProgressAction() {
    const userId = await requireUserId();

    return getSubjectProgressService(userId);
}

export async function getSingleSubjectProgressAction(
    subjectId: string,
) {
    const userId = await requireUserId();

    return getSingleSubjectProgressService(
        userId,
        subjectId,
    );
}

export async function getRecentLearningActivityAction() {
    const userId = await requireUserId();

    return getRecentLearningActivityService(userId);
}

export async function getContinueLearningAction() {
    const userId = await requireUserId();

    return getContinueLearningService(userId);
}

/* =========================================================
   CONTENT MUTATIONS
   ========================================================= */

export async function completeContentAction(
    contentId: string,
) {
    const userId = await requireUserId();

    return completeContentService(
        userId,
        contentId,
    );
}

export async function incompleteContentAction(
    contentId: string,
) {
    const userId = await requireUserId();

    return incompleteContentService(
        userId,
        contentId,
    );
}