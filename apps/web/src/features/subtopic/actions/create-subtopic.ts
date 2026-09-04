"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/src/lib/auth/require-admin";

import { createSubtopicService } from "../services";
import {
  createSubtopicSchema,
  type CreateSubtopicInput,
} from "../validations";

export async function createSubtopicAction(
  input: CreateSubtopicInput,
) {
  await requireAdmin();

  const data = createSubtopicSchema.parse(input);

  await createSubtopicService(data);

  revalidatePath("/admin/subtopics");
}