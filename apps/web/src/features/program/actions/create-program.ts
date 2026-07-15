"use server";

import { CreateProgramSchema } from "../validations/program.schema";
import { createProgramService } from "../services/program.service";

export async function createProgramAction(formData: FormData) {
  const data = CreateProgramSchema.parse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    code: formData.get("code"),
    description: formData.get("description") || undefined,
    icon: formData.get("icon") || undefined,
    color: formData.get("color") || undefined,
  });

  return await createProgramService(data);
}