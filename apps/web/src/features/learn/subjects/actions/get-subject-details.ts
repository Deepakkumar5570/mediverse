"use server";

import { getSubjectDetailsService } from "../services";

export async function getSubjectDetailsAction(
    subjectId: string
) {
    return getSubjectDetailsService(subjectId);
}