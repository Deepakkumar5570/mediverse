"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/src/lib/auth/require-admin";

import {
  createTopicsService,
} from "../services";

import {
  createTopicsSchema,
  type CreateTopicsInput,
} from "../validations";


/**
 * Create multiple topics at once.
 */
export async function createTopicsAction(
  input: CreateTopicsInput,
) {
  /**
   * Only admins can create topics.
   */
  await requireAdmin();


  /**
   * Validate input on the server.
   */
  const data =
    createTopicsSchema.parse(input);


  /**
   * Create topics.
   */
  const created =
    await createTopicsService(data);


  /**
   * Refresh admin topic pages.
   */
  revalidatePath("/admin/topics");

  revalidatePath(
    `/admin/units/${data.unitId}`,
  );

  revalidatePath(
    "/admin/content-builder",
  );


  return created;
}