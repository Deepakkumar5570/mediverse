import {
  submitMcqAnswerRepository,
} from "../repositories";

export async function submitMcqAnswerService(
  mcqId: string,
  selectedOption: number,
) {
  return submitMcqAnswerRepository(
    mcqId,
    selectedOption,
  );
}