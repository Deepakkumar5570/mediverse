import { getSubjectDetailsRepository } from "../repositories";

export async function getSubjectDetailsService(
    subjectId: string
) {
    return getSubjectDetailsRepository(subjectId);
}