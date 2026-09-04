"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/src/lib/auth/require-admin";

import { updateTopicService } from "../services";
import {
  createTopicSchema,
  type CreateTopicInput,
} from "../validations";

export async function updateTopicAction(
  id: string,
  input: CreateTopicInput,
) {
  await requireAdmin();

  const data = createTopicSchema.parse(input);

  await updateTopicService(id, data);

  revalidatePath("/admin/topics");
  revalidatePath(`/admin/topics/${id}/edit`);
}