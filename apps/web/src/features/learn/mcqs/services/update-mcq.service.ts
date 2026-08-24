import {
  updateMcqRepository,
} from "../repositories";

import type {
  CreateMcqInput,
} from "../validations";

export async function updateMcqService(
  id: string,
  data: CreateMcqInput,
) {
  return updateMcqRepository(
    id,
    data,
  );
}