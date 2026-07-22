import {
  createUnitRepository,
  getUnitsBySubjectRepository,
  getUnitsRepository,
} from "../repositories";

import type { CreateUnitInput } from "../validations";

export async function createUnitService(
  data: CreateUnitInput
) {
  return createUnitRepository(data);
}

export async function getUnitsService() {
  return getUnitsRepository();
}

export async function getUnitsBySubjectService(
  subjectId: string
) {
  return getUnitsBySubjectRepository(subjectId);
}