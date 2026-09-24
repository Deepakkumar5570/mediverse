"use server";

import {
  getSemesterDetailsBySlugService,
  getSemesterDetailsService,
} from "../services";

import { isUuid } from "@/src/lib/learn/routing";

export async function getSemesterDetailsAction(
  semesterIdOrSlug: string,
) {
  if (isUuid(semesterIdOrSlug)) {
    return getSemesterDetailsService(
      semesterIdOrSlug,
    );
  }

  return getSemesterDetailsBySlugService(
    semesterIdOrSlug,
  );
}