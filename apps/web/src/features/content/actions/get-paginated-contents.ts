"use server";

import { getPaginatedContentsService } from "../services";

export async function getPaginatedContentsAction(
  page: number,
  limit = 10
) {
  const currentPage = Math.max(1, page);

  return getPaginatedContentsService(
    currentPage,
    limit
  );
}