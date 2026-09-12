"use server";

import { revalidatePath } from "next/cache";

import {
  requireAdmin,
} from "@/src/lib/auth/require-admin";

import {
  createUnitsService,
} from "../services";

import {
  createUnitsSchema,
  type CreateUnitsInput,
} from "../validations";


export async function createUnitsAction(
  input: CreateUnitsInput,
) {
  await requireAdmin();

  const data =
    createUnitsSchema.parse(input);

  const created =
    await createUnitsService(data);

  revalidatePath(
    "/admin/units",
  );

  revalidatePath(
    "/admin/subjects",
  );

  revalidatePath(
    "/admin/content-builder",
  );

  return created;
}