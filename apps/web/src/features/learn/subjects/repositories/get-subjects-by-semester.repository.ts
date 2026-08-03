import { asc, eq } from "drizzle-orm";

import {
    db,
    subjects,
} from "@mediverse/database";

export async function getSubjectsBySemesterRepository(
    semesterId: string
) {
    return db
        .select()
        .from(subjects)
        .where(eq(subjects.semesterId, semesterId))
        .orderBy(asc(subjects.name));
}