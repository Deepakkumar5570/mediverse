"use server";

import { revalidatePath } from "next/cache";

import { createTopicService } from "../services";
import {
  createTopicSchema,
  type CreateTopicInput,
} from "../validations";

export async function createTopicAction(
  input: CreateTopicInput
) {
  const data = createTopicSchema.parse(input);

  await createTopicService(data);

  revalidatePath("/admin/topics");
}