import {
  createSemesterRepository,
  getSemestersByProgramRepository,
  getSemestersRepository,
} from "../repositories";

import type { CreateSemesterInput } from "../validations/semester.schema";

export async function createSemesterService(
  data: CreateSemesterInput
) {
  return createSemesterRepository(data);
}

export async function getSemestersService() {
  return getSemestersRepository();
}

export async function getSemestersByProgramService(
  programId: string
) {
  return getSemestersByProgramRepository(programId);
}