"use server";

import { revalidatePath } from "next/cache";

import { updateTopicService } from "../services";

import {
  createTopicSchema,
  type CreateTopicInput,
} from "../validations";

export async function updateTopicAction(
  id: string,
  input: CreateTopicInput,
) {
  const data = createTopicSchema.parse(input);

  await updateTopicService(id, data);

  revalidatePath("/admin/topics");
  revalidatePath(`/admin/topics/${id}/edit`);
}