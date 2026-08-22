import {
  createUnitRepository,
  getUnitByIdRepository,
  getUnitBySlugRepository,
  getUnitsBySubjectRepository,
  getUnitsRepository,
  updateUnitRepository,
} from "../repositories";

import type { CreateUnitInput } from "../validations";

export async function createUnitService(
  data: CreateUnitInput,
) {
  const existing = await getUnitBySlugRepository(
    data.slug,
  );

  if (existing) {
    throw new Error("Unit slug already exists.");
  }

  return createUnitRepository(data);
}

export async function getUnitsService() {
  return getUnitsRepository();
}

export async function getUnitByIdService(
  id: string,
) {
  return getUnitByIdRepository(id);
}

export async function getUnitsBySubjectService(
  subjectId: string,
) {
  return getUnitsBySubjectRepository(subjectId);
}

export async function updateUnitService(
  id: string,
  data: CreateUnitInput,
) {
  const existing = await getUnitBySlugRepository(
    data.slug,
  );

  if (existing && existing.id !== id) {
    throw new Error("Unit slug already exists.");
  }

  const unit = await updateUnitRepository(
    id,
    data,
  );

  if (!unit) {
    throw new Error("Unit not found.");
  }

  return unit;
}