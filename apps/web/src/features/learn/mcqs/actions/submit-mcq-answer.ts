"use server";

import {
  submitMcqAnswerService,
} from "../services";

export async function submitMcqAnswerAction(
  mcqId: string,
  selectedOption: number,
) {
  return submitMcqAnswerService(
    mcqId,
    selectedOption,
  );
}