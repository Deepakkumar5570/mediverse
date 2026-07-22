"use server";

import {
  getSubjectsBySemesterService,
  getSubjectsService,
} from "../services";

export async function getSubjectsAction() {
  return getSubjectsService();
}

export async function getSubjectsBySemesterAction(
  semesterId: string
) {
  return getSubjectsBySemesterService(semesterId);
}