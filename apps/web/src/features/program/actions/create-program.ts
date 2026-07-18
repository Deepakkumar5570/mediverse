"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createProgramService } from "../services/program.service";
import { CreateProgramSchema } from "../validations/program.schema";

export async function createProgramAction(formData: FormData) {
  console.log("FORM DATA");

  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  const data = CreateProgramSchema.parse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    code: formData.get("code"),
    description: formData.get("description") || undefined,
    duration: Number(formData.get("duration")),
    status:
      (formData.get("status") as "active" | "inactive") ??
      "active",
    icon: formData.get("icon") || undefined,
    color: formData.get("color") || undefined,
  });

  await createProgramService(data);

  revalidatePath("/admin/programs");

  redirect("/admin/programs");
}