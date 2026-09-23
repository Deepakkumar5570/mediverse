"use server";

import {
  getSemesterByIdService,
  getSemesterBySlugService,
  getSemestersByProgramService,
  getSemestersService,
} from "../services/semester.service";

export async function getSemestersAction() {
  return getSemestersService();
}

export async function getSemestersByProgramAction(
  programId: string,
) {
  return getSemestersByProgramService(
    programId,
  );
}

export async function getSemesterByIdAction(
  id: string,
) {
  return getSemesterByIdService(id);
}

export async function getSemesterBySlugAction(
  slug: string,
) {
  return getSemesterBySlugService(slug);
}