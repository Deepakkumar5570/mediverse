"use server";

import { revalidatePath } from "next/cache";

import { createSubtopicService } from "../services";
import {
  createSubtopicSchema,
  type CreateSubtopicInput,
} from "../validations";

export async function createSubtopicAction(
  input: CreateSubtopicInput
) {
  const data = createSubtopicSchema.parse(input);

  await createSubtopicService(data);

  revalidatePath("/admin/subtopics");
}