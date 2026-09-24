"use server";

import {
  getSubjectByIdService,
  getSubjectBySlugService,
  getSubjectsBySemesterService,
  getSubjectsService,
} from "../services";

export async function getSubjectsAction() {
  return getSubjectsService();
}

export async function getSubjectByIdAction(
  id: string,
) {
  return getSubjectByIdService(id);
}

export async function getSubjectBySlugAction(
  slug: string,
) {
  return getSubjectBySlugService(slug);
}

export async function getSubjectsBySemesterAction(
  semesterId: string,
) {
  return getSubjectsBySemesterService(semesterId);
}