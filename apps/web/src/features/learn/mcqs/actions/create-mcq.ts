"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/src/lib/auth/require-admin";

import { createMcqService } from "../services";
import {
  createMcqSchema,
  type CreateMcqInput,
} from "../validations";

export async function createMcqAction(
  input: CreateMcqInput,
) {
  await requireAdmin();

  const data = createMcqSchema.parse(input);

  const mcq = await createMcqService(data);

  revalidatePath("/admin/mcqs");

  return mcq;
}