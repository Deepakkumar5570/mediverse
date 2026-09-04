"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/src/lib/auth/require-admin";

import { updateSemesterService } from "../services/semester.service";
import { CreateSemesterSchema } from "../validations/semester.schema";

export async function updateSemesterAction(
  id: string,
  input: {
    programId: string;
    name: string;
    number: number;
    status: "active" | "inactive";
  },
) {
  await requireAdmin();

  const data = CreateSemesterSchema.parse(input);

  const semester = await updateSemesterService(id, data);

  if (!semester) {
    throw new Error("Semester not found.");
  }

  revalidatePath("/admin/semesters");
  revalidatePath(`/admin/semesters/${id}/edit`);

  return semester;
}