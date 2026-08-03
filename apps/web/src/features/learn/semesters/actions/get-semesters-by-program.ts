"use server";

import { getSemestersByProgramService } from "../services";

export async function getSemestersByProgramAction(
    programId: string
) {
    return getSemestersByProgramService(programId);
}