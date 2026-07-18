"use server";

import {
  getSubjectsByProgramService,
  getSubjectsService,
} from "../services";

export async function getSubjectsAction() {
  return getSubjectsService();
}

export async function getSubjectsByProgramAction(
  programId: string
) {
  return getSubjectsByProgramService(programId);
}