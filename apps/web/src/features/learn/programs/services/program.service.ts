import { getProgramsRepository } from "../repositories";

export async function getProgramsService() {
  return getProgramsRepository();
}