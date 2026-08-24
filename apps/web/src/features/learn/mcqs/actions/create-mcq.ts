"use server";

import { revalidatePath } from "next/cache";

import { createMcqService } from "../services";
import {
  createMcqSchema,
  type CreateMcqInput,
} from "../validations";

export async function createMcqAction(
  input: CreateMcqInput,
) {
  const data = createMcqSchema.parse(input);

  const mcq = await createMcqService(data);

  revalidatePath("/admin/mcqs");

  return mcq;
}