"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/src/lib/auth/require-admin";

import { deleteContentService } from "../services";

export async function deleteContentAction(id: string) {
  await requireAdmin();

  await deleteContentService(id);

  revalidatePath("/admin/contents");
}