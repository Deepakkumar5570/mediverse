import { eq } from "drizzle-orm";

import {
    db,
    programs,
    semesters,
} from "@mediverse/database";

export async function getSemesterDetailsRepository(
    semesterId: string
) {
    const [result] = await db
        .select({
            semester: semesters,
            program: programs,
        })
        .from(semesters)
        .innerJoin(
            programs,
            eq(semesters.programId, programs.id)
        )
        .where(eq(semesters.id, semesterId));

    return result ?? null;
}