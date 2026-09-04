"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/src/lib/auth/require-admin";

import { createSubjectService } from "../services";
import {
  CreateSubjectSchema,
  type CreateSubjectInput,
} from "../validations/subject.schema";

export async function createSubjectAction(
  input: CreateSubjectInput,
) {
  await requireAdmin();

  const data = CreateSubjectSchema.parse(input);

  await createSubjectService(data);

  revalidatePath("/admin/subjects");
}