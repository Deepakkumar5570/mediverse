"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/src/lib/auth/require-admin";

import { updateContentService } from "../services";
import {
  createContentSchema,
  type CreateContentInput,
} from "../validations";

export async function updateContentAction(
  id: string,
  input: CreateContentInput
) {
  await requireAdmin();

  const data = createContentSchema.parse(input);

  await updateContentService(id, data);

  revalidatePath("/admin/contents");
  revalidatePath(`/admin/contents/${id}`);
}