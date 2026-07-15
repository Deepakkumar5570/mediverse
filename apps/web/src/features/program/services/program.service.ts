import "server-only";

import {
  createProgramRepository,
  getProgramBySlugRepository,
  getProgramsRepository,
} from "../repositories/program.repository";

import type { CreateProgramInput } from "../validations/program.schema";

export async function getProgramsService() {
  return getProgramsRepository();
}

export async function createProgramService(
  data: CreateProgramInput
) {
  const existing = await getProgramBySlugRepository(data.slug);

  if (existing) {
    throw new Error("Program slug already exists.");
  }

  return createProgramRepository(data);
}