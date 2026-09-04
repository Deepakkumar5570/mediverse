"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/src/lib/auth/require-admin";

import { createTopicService } from "../services";
import {
  createTopicSchema,
  type CreateTopicInput,
} from "../validations";

export async function createTopicAction(
  input: CreateTopicInput,
) {
  await requireAdmin();

  const data = createTopicSchema.parse(input);

  await createTopicService(data);

  revalidatePath("/admin/topics");
}