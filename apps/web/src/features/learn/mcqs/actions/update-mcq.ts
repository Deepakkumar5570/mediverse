"use server";

import { revalidatePath } from "next/cache";

import { updateMcqService } from "../services";
import {
  createMcqSchema,
  type CreateMcqInput,
} from "../validations";

export async function updateMcqAction(
  id: string,
  input: CreateMcqInput,
) {
  const data = createMcqSchema.parse(input);

  const mcq = await updateMcqService(
    id,
    data,
  );

  if (!mcq) {
    throw new Error("MCQ not found.");
  }

  revalidatePath("/admin/mcqs");
  revalidatePath(`/admin/mcqs/${id}`);
  revalidatePath(`/admin/mcqs/${id}/edit`);

  return mcq;
}