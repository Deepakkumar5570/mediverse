"use server";

import { getUnitsBySubjectService } from "../services";

export async function getUnitsBySubjectAction(
    subjectId: string
) {
    return getUnitsBySubjectService(subjectId);
}