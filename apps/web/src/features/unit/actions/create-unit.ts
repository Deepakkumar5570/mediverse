"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/src/lib/auth/require-admin";

import { createUnitService } from "../services";
import {
  createUnitSchema,
  type CreateUnitInput,
} from "../validations";

export async function createUnitAction(
  input: CreateUnitInput,
) {
  await requireAdmin();

  const data = createUnitSchema.parse(input);

  await createUnitService(data);

  revalidatePath("/admin/units");
}