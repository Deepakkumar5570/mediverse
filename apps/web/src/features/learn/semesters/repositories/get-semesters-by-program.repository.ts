import { asc, eq } from "drizzle-orm";

import {
    db,
    semesters,
} from "@mediverse/database";

export async function getSemestersByProgramRepository(
    programId: string
) {
    return db
        .select()
        .from(semesters)
        .where(eq(semesters.programId, programId))
        .orderBy(asc(semesters.number));
}