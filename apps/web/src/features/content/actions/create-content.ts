"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/src/lib/auth/require-admin";

import { createContentService } from "../services";
import {
  createContentSchema,
  type CreateContentInput,
} from "../validations";

export async function createContentAction(
  input: CreateContentInput
) {
  await requireAdmin();

  const data = createContentSchema.parse(input);

  await createContentService(data);

  revalidatePath("/admin/contents");
}