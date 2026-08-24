"use server";

import { revalidatePath } from "next/cache";

import { deleteMcqService } from "../services";

export async function deleteMcqAction(
  id: string,
) {
  await deleteMcqService(id);

  revalidatePath("/admin/mcqs");
}