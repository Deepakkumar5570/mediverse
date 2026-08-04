import { eq } from "drizzle-orm";

import {
    db,
    programs,
    semesters,
    subjects,
} from "@mediverse/database";

export async function getSubjectDetailsRepository(
    subjectId: string
) {
    const [result] = await db
        .select({
            subject: subjects,
            semester: semesters,
            program: programs,
        })
        .from(subjects)
        .innerJoin(
            semesters,
            eq(subjects.semesterId, semesters.id)
        )
        .innerJoin(
            programs,
            eq(semesters.programId, programs.id)
        )
        .where(eq(subjects.id, subjectId));

    return result ?? null;
}