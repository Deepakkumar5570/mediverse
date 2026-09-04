"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/src/lib/auth/require-admin";

import { createSemesterService } from "../services/semester.service";
import {
  CreateSemesterSchema,
  type CreateSemesterInput,
} from "../validations/semester.schema";

export async function createSemesterAction(
  input: CreateSemesterInput,
) {
  await requireAdmin();

  const data = CreateSemesterSchema.parse(input);

  await createSemesterService(data);

  revalidatePath("/admin/semesters");
}