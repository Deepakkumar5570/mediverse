"use server";

import { revalidatePath } from "next/cache";

import { createUnitService } from "../services";
import {
  CreateUnitSchema,
  type CreateUnitInput,
} from "../validations";

export async function createUnitAction(
  input: CreateUnitInput
) {
  const data = CreateUnitSchema.parse(input);

  await createUnitService(data);

  revalidatePath("/admin/units");
}