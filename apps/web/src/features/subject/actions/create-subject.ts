"use server";

import { revalidatePath } from "next/cache";

import { createSubjectService } from "../services";
import {
  CreateSubjectSchema,
  type CreateSubjectInput,
} from "../validations/subject.schema";

export async function createSubjectAction(
  input: CreateSubjectInput
) {
  const data = CreateSubjectSchema.parse(input);

  await createSubjectService(data);

  revalidatePath("/admin/subjects");
}