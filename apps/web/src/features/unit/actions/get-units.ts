"use server";

import {
  getUnitByIdService,
  getUnitBySlugService,
  getUnitsBySubjectService,
  getUnitsService,
} from "../services";

export async function getUnitsAction() {
  return getUnitsService();
}

export async function getUnitByIdAction(
  id: string,
) {
  return getUnitByIdService(id);
}

export async function getUnitBySlugAction(
  slug: string,
) {
  return getUnitBySlugService(slug);
}

export async function getUnitsBySubjectAction(
  subjectId: string,
) {
  return getUnitsBySubjectService(
    subjectId,
  );
}