"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/src/lib/auth/require-admin";

import { deleteMcqService } from "../services";

export async function deleteMcqAction(
  id: string,
) {
  await requireAdmin();

  await deleteMcqService(id);

  revalidatePath("/admin/mcqs");
}