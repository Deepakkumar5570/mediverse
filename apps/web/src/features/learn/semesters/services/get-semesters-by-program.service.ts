import { getSemestersByProgramRepository } from "../repositories";

export async function getSemestersByProgramService(
    programId: string
) {
    return getSemestersByProgramRepository(programId);
}