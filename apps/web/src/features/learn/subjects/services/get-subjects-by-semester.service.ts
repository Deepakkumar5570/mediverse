import { getSubjectsBySemesterRepository } from "../repositories";

export async function getSubjectsBySemesterService(
    semesterId: string
) {
    return getSubjectsBySemesterRepository(
        semesterId
    );
}