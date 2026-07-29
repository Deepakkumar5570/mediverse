"use server";

import { revalidatePath } from "next/cache";

import { deleteContentService } from "../services";

export async function deleteContentAction(
  id: string
) {
  await deleteContentService(id);

  revalidatePath("/admin/contents");
}