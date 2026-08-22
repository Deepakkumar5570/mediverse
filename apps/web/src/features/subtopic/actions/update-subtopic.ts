"use server";

import { revalidatePath } from "next/cache";

import { updateSubtopicService } from "../services";

import {
  createSubtopicSchema,
  type CreateSubtopicInput,
} from "../validations";

export async function updateSubtopicAction(
  id: string,
  input: CreateSubtopicInput,
) {
  const data = createSubtopicSchema.parse(input);

  const subtopic = await updateSubtopicService(
    id,
    data,
  );

  if (!subtopic) {
    throw new Error("Subtopic not found.");
  }

  revalidatePath("/admin/subtopics");
  revalidatePath(`/admin/subtopics/${id}/edit`);

  return subtopic;
}