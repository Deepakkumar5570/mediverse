"use server";

import { requireUserId } from "@/src/lib/auth/require-user-id";

import {
  completePracticeSessionService,
  createPracticeSessionService,
  getMcqStatsService,
  recordMcqAttemptService,
} from "./practice.service";

export async function createPracticeSessionAction(
  mode: "quick" | "topic" | "random",
) {
  const userId = await requireUserId();

  return createPracticeSessionService(userId, mode);
}

export async function recordMcqAttemptAction(data: {
  sessionId: string;
  mcqId: string;
  selectedOption: number;
  correct: boolean;
  timeTaken?: number | null;
}) {
  const userId = await requireUserId();

  return recordMcqAttemptService(userId, data);
}

export async function completePracticeSessionAction(data: {
  sessionId: string;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
}) {
  const userId = await requireUserId();

  return completePracticeSessionService(
    userId,
    data.sessionId,
    {
      totalQuestions: data.totalQuestions,
      correctAnswers: data.correctAnswers,
      wrongAnswers: data.wrongAnswers,
    },
  );
}

export async function getMcqStatsAction() {
  const userId = await requireUserId();

  return getMcqStatsService(userId);
}