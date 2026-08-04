import { eq } from "drizzle-orm";

import {
    db,
    programs,
    semesters,
    subjects,
    units,
} from "@mediverse/database";

export async function getUnitDetailsRepository(
    unitId: string
) {
    const result = await db
        .select({
            unit: units,
            subject: subjects,
            semester: semesters,
            program: programs,
        })
        .from(units)
        .innerJoin(
            subjects,
            eq(units.subjectId, subjects.id)
        )
        .innerJoin(
            semesters,
            eq(subjects.semesterId, semesters.id)
        )
        .innerJoin(
            programs,
            eq(semesters.programId, programs.id)
        )
        .where(eq(units.id, unitId));

    return result[0] ?? null;
}