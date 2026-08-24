import {
  createMcqRepository,
} from "../repositories";

import type {
  CreateMcqInput,
} from "../validations";

export async function createMcqService(
  data: CreateMcqInput,
) {
  return createMcqRepository(data);
}