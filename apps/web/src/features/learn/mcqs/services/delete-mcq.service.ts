import {
  deleteMcqRepository,
} from "../repositories";

export async function deleteMcqService(
  id: string,
) {
  return deleteMcqRepository(id);
}