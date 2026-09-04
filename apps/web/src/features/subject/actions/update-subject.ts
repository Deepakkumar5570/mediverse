"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/src/lib/auth/require-admin";

import { updateSubjectService } from "../services";
import {
  CreateSubjectSchema,
  type CreateSubjectInput,
} from "../validations/subject.schema";

export async function updateSubjectAction(
  id: string,
  input: CreateSubjectInput,
) {
  await requireAdmin();

  const data = CreateSubjectSchema.parse(input);

  await updateSubjectService(id, data);

  revalidatePath("/admin/subjects");
  revalidatePath(`/admin/subjects/${id}/edit`);
}