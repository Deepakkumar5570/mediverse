"use server";

import {
  getUnitsBySubjectService,
  getUnitsService,
} from "../services";

export async function getUnitsAction() {
  return getUnitsService();
}

export async function getUnitsBySubjectAction(
  subjectId: string
) {
  return getUnitsBySubjectService(subjectId);
}