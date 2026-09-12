"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/src/lib/auth/require-admin";

import { createSubtopicsService } from "../services";
import {
  createSubtopicsSchema,
  type CreateSubtopicsInput,
} from "../validations";

export async function createSubtopicsAction(
  input: CreateSubtopicsInput,
) {
  await requireAdmin();

  const data = createSubtopicsSchema.parse(input);

  const created = await createSubtopicsService(
    data.topicId,
    data.subtopics,
  );

  revalidatePath("/admin/subtopics");
  revalidatePath("/admin/content-builder");

  return created;
}

