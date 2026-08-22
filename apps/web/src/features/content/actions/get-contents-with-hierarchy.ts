"use server";

import {
  getPaginatedContentsWithHierarchyService,
} from "../services";

export async function getPaginatedContentsWithHierarchyAction(
  page: number,
  limit: number,
  search?: string,
  status?: "draft" | "active" | "archived"
) {
  return getPaginatedContentsWithHierarchyService(
    page,
    limit,
    search,
    status
  );
}