import { getUnitsBySubjectRepository } from "../repositories";

export async function getUnitsBySubjectService(
    subjectId: string
) {
    return getUnitsBySubjectRepository(subjectId);
}