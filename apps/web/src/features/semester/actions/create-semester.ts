"use server";

import { revalidatePath } from "next/cache";

import { createSemesterService } from "../services/semester.service";
import {
  CreateSemesterSchema,
  type CreateSemesterInput,
} from "../validations/semester.schema";

export async function createSemesterAction(
  input: CreateSemesterInput
) {
  const data = CreateSemesterSchema.parse(input);

  await createSemesterService(data);

  revalidatePath("/admin/semesters");
}