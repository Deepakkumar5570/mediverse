import {
  createSubjectRepository,
  getSubjectsBySemesterRepository,
  getSubjectsRepository,
} from "../repositories";

import type { CreateSubjectInput } from "../validations/subject.schema";

export async function createSubjectService(
  data: CreateSubjectInput
) {
  return createSubjectRepository(data);
}

export async function getSubjectsService() {
  return getSubjectsRepository();
}

export async function getSubjectsBySemesterService(
  semesterId: string
) {
  return getSubjectsBySemesterRepository(semesterId);
}