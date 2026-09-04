"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/src/lib/auth/require-admin";

import { updateUnitService } from "../services";
import {
  CreateUnitSchema,
  type CreateUnitInput,
} from "../validations";

export async function updateUnitAction(
  id: string,
  input: CreateUnitInput,
) {
  await requireAdmin();

  const data = CreateUnitSchema.parse(input);

  await updateUnitService(id, data);

  revalidatePath("/admin/units");
  revalidatePath(`/admin/units/${id}/edit`);
}