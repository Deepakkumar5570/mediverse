"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { updateProgramService } from "../services/program.service";
import { CreateProgramSchema } from "../validations/program.schema";

export async function updateProgramAction(
  formData: FormData,
) {
  const id = String(formData.get("id"));

  if (!id) {
    throw new Error("Program ID is required.");
  }

  const data = CreateProgramSchema.parse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    code: formData.get("code"),
    description:
      formData.get("description") || undefined,
    duration: Number(formData.get("duration")),
    status:
      (formData.get("status") as
        | "active"
        | "inactive") ?? "active",
    icon: formData.get("icon") || undefined,
    color: formData.get("color") || undefined,
  });

  await updateProgramService(id, data);

  revalidatePath("/admin/programs");

  redirect("/admin/programs");
}