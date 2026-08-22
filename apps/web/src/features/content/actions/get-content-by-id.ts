"use server";

import {
  getContentByIdWithHierarchyService,
} from "../services";

export async function getContentByIdWithHierarchyAction(
  id: string
) {
  return getContentByIdWithHierarchyService(id);
}