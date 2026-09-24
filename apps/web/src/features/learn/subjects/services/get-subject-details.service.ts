import {
  getSubjectDetailsBySlugRepository,
  getSubjectDetailsRepository,
} from "../repositories";

export async function getSubjectDetailsService(
  subjectId: string,
) {
  return getSubjectDetailsRepository(
    subjectId,
  );
}

export async function getSubjectDetailsBySlugService(
  slug: string,
) {
  return getSubjectDetailsBySlugRepository(
    slug,
  );
}