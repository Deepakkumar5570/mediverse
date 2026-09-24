"use server";

import {
  getSubjectDetailsBySlugService,
  getSubjectDetailsService,
} from "../services";

import { isUuid } from "@/src/lib/learn/routing";

export async function getSubjectDetailsAction(
  subjectIdOrSlug: string,
) {
  if (isUuid(subjectIdOrSlug)) {
    return getSubjectDetailsService(
      subjectIdOrSlug,
    );
  }

  return getSubjectDetailsBySlugService(
    subjectIdOrSlug,
  );
}