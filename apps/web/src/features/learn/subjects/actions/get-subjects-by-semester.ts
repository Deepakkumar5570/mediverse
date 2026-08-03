"use server";

import { getSubjectsBySemesterService } from "../services";

export async function getSubjectsBySemesterAction(
    semesterId: string
) {
    return getSubjectsBySemesterService(semesterId);
}