import { getProgramBySlugRepository } from "../repositories";

export async function getProgramBySlugService(
  slug: string
) {
  return getProgramBySlugRepository(slug);
}