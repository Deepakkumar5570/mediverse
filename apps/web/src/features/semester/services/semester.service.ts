import {
  createSemesterRepository,
  getSemesterByIdRepository,
  getSemestersByProgramRepository,
  getSemestersRepository,
  updateSemesterRepository,
} from "../repositories";

import type { CreateSemesterInput } from "../validations/semester.schema";

export async function createSemesterService(
  data: CreateSemesterInput,
) {
  return createSemesterRepository(data);
}

export async function getSemestersService() {
  return getSemestersRepository();
}

export async function getSemestersByProgramService(
  programId: string,
) {
  return getSemestersByProgramRepository(programId);
}

export async function getSemesterByIdService(
  id: string,
) {
  return getSemesterByIdRepository(id);
}

export async function updateSemesterService(
  id: string,
  data: CreateSemesterInput,
) {
  return updateSemesterRepository(id, data);
}