"use server";

import { getProgramBySlugService } from "../services";

export async function getProgramBySlugAction(
  slug: string
) {
  return getProgramBySlugService(slug);
}