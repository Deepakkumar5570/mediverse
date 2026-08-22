"use server";

import { getPaginatedContentsService } from "../services";

export async function getPaginatedContentsAction(
  page: number,
  limit: number,
  search?: string,
  status?: "draft" | "active" | "archived"
) {
  return getPaginatedContentsService(
    page,
    limit,
    search,
    status
  );
}