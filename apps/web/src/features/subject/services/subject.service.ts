import {
  createSubjectRepository,
  getSubjectByIdRepository,
  getSubjectBySlugRepository,
  getSubjectsBySemesterRepository,
  getSubjectsRepository,
  updateSubjectRepository,
} from "../repositories";

import type { CreateSubjectInput } from "../validations/subject.schema";

export async function createSubjectService(
  data: CreateSubjectInput,
) {
  const existing = await getSubjectBySlugRepository(
    data.slug,
  );

  if (existing) {
    throw new Error("Subject slug already exists.");
  }

  return createSubjectRepository(data);
}

export async function getSubjectsService() {
  return getSubjectsRepository();
}

export async function getSubjectByIdService(
  id: string,
) {
  return getSubjectByIdRepository(id);
}

export async function getSubjectsBySemesterService(
  semesterId: string,
) {
  return getSubjectsBySemesterRepository(semesterId);
}

export async function updateSubjectService(
  id: string,
  data: CreateSubjectInput,
) {
  const existing = await getSubjectBySlugRepository(
    data.slug,
  );

  if (existing && existing.id !== id) {
    throw new Error("Subject slug already exists.");
  }

  const subject = await updateSubjectRepository(
    id,
    data,
  );

  if (!subject) {
    throw new Error("Subject not found.");
  }

  return subject;
}