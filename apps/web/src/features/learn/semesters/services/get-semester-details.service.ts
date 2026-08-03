import { getSemesterDetailsRepository } from "../repositories";

export async function getSemesterDetailsService(
    semesterId: string
) {
    return getSemesterDetailsRepository(semesterId);
}