"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/src/lib/auth/require-admin";

import { updateMcqService } from "../services";
import {
  createMcqSchema,
  type CreateMcqInput,
} from "../validations";

export async function updateMcqAction(
  id: string,
  input: CreateMcqInput,
) {
  await requireAdmin();

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