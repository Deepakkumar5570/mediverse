import {
  getSemesterDetailsBySlugRepository,
  getSemesterDetailsRepository,
} from "../repositories";

export async function getSemesterDetailsService(
  semesterId: string,
) {
  return getSemesterDetailsRepository(
    semesterId,
  );
}

export async function getSemesterDetailsBySlugService(
  slug: string,
) {
  return getSemesterDetailsBySlugRepository(
    slug,
  );
}