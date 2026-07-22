"use server";

import {
  getSemestersByProgramService,
  getSemestersService,
} from "../services/semester.service";

export async function getSemestersAction() {
  return getSemestersService();
}

export async function getSemestersByProgramAction(
  programId: string
) {
  return getSemestersByProgramService(programId);
}