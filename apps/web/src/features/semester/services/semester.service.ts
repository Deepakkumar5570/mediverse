import {
  createSemesterRepository,
  getSemesterByIdRepository,
  getSemesterBySlugRepository,
  getSemestersByProgramRepository,
  getSemestersRepository,
  updateSemesterRepository,
} from "../repositories";

import type { CreateSemesterInput } from "../validations/semester.schema";

export async function createSemesterService(
  data: CreateSemesterInput,
) {
  const existing = await getSemesterBySlugRepository(
    data.slug,
  );

  if (existing) {
    throw new Error(
      "Semester slug already exists.",
    );
  }

  return createSemesterRepository(data);
}

export async function getSemestersService() {
  return getSemestersRepository();
}

export async function getSemestersByProgramService(
  programId: string,
) {
  return getSemestersByProgramRepository(
    programId,
  );
}

export async function getSemesterByIdService(
  id: string,
) {
  return getSemesterByIdRepository(id);
}

export async function getSemesterBySlugService(
  slug: string,
) {
  return getSemesterBySlugRepository(slug);
}

export async function updateSemesterService(
  id: string,
  data: CreateSemesterInput,
) {
  const existing = await getSemesterBySlugRepository(
    data.slug,
  );

  if (
    existing &&
    existing.id !== id
  ) {
    throw new Error(
      "Semester slug already exists.",
    );
  }

  const semester =
    await updateSemesterRepository(
      id,
      data,
    );

  if (!semester) {
    throw new Error(
      "Semester not found.",
    );
  }

  return semester;
}