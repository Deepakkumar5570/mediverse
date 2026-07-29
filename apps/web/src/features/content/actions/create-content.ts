"use server";

import { revalidatePath } from "next/cache";

import { createContentService } from "../services";
import {
  createContentSchema,
  type CreateContentInput,
} from "../validations";

export async function createContentAction(
  input: CreateContentInput
) {
  const data = createContentSchema.parse(input);

  await createContentService(data);

  revalidatePath("/admin/contents");
}